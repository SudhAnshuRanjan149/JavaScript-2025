/*
  INDEXEDDB IN JAVASCRIPT — GREAT DETAIL
  --------------------------------------
  ✔ IndexedDB = built-in, client-side **NoSQL database** in the browser.
  ✔ Key features:
      - Stores large amounts of structured data (MBs–GBs, depends on browser).
      - Asynchronous & non-blocking.
      - Supports transactions.
      - Data is stored as key-value pairs (objects).
      - Great for offline apps, PWAs, caching API responses, etc.

  ✔ It’s lower-level and more verbose than localStorage, but much more powerful.

  HIGH-LEVEL CONCEPTS:
    - database (DB)
    - object stores (like tables, but schema-less)
    - key paths & indexes
    - transactions (atomic operations)
    - requests (IDBRequest, success/error events)
*/



/* ============================================================
   1. OPENING / CREATING A DATABASE
   ============================================================
   API:
     const request = indexedDB.open(name, version);

   ✔ version:
       - integer
       - used for schema migration
       - triggers onupgradeneeded when version changes
*/

function openDB() {
  const request = indexedDB.open("MyAppDB", 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    console.log("[IndexedDB] onupgradeneeded, oldVersion:", event.oldVersion);

    /*
      This runs when:
        - DB is created first time
        - OR version is increased (schema change)
    */

    // Create an object store (like a table)
    // keyPath = primary key field
    if (!db.objectStoreNames.contains("users")) {
      const userStore = db.createObjectStore("users", {
        keyPath: "id",        // user.id will be primary key
        autoIncrement: true,  // if id not provided, auto increment
      });

      // Create indexes (for efficient queries)
      userStore.createIndex("by_name", "name", { unique: false });
      userStore.createIndex("by_email", "email", { unique: true });
    }
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log("[IndexedDB] opened successfully:", db.name);

    // You can now use db for transactions
  };

  request.onerror = function (event) {
    console.error("[IndexedDB] error:", event.target.error);
  };
}

// openDB();



/* ============================================================
   2. USING A PROMISE WRAPPER (FOR CLEANER CODE)
   ============================================================
   The native IndexedDB uses event-based callbacks.
   It's much nicer to wrap it in Promises.
*/

function openDBPromise(name, version, upgradeCallback) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      upgradeCallback && upgradeCallback(db, event.oldVersion, event.newVersion);
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };

    request.onerror = event => {
      reject(event.target.error);
    };
  });
}



/*
  Example: open DB with users store
*/

async function initDB() {
  const db = await openDBPromise("MyAppDB", 1, (db, oldVersion, newVersion) => {
    console.log("[openDBPromise] upgrade from", oldVersion, "to", newVersion);

    if (!db.objectStoreNames.contains("users")) {
      const store = db.createObjectStore("users", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("by_name", "name", { unique: false });
      store.createIndex("by_email", "email", { unique: true });
    }
  });

  return db;
}



/* ============================================================
   3. TRANSACTIONS & OBJECT STORES
   ============================================================
   ✔ To read/write data, you MUST open a transaction.

   API:
      const tx = db.transaction(storeNames, mode);
      const store = tx.objectStore("users");
      mode = "readonly" | "readwrite"
*/

async function addUser(db, user) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");

    const request = store.add(user); // add fails if key exists; use put for upsert

    request.onsuccess = () => {
      resolve(request.result); // result is key (id)
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}



/* ============================================================
   4. BASIC CRUD OPERATIONS
   ============================================================
   A) CREATE / INSERT: store.add()
   B) READ: store.get(), store.getAll()
   C) UPDATE / UPSERT: store.put()
   D) DELETE: store.delete()
*/



/* ------------------------------------------------------------
   A) CREATE / INSERT (add)
   ------------------------------------------------------------ */

async function demoCreate() {
  const db = await initDB();

  const id = await addUser(db, {
    name: "Alice",
    email: "alice@example.com",
    age: 25,
  });

  console.log("Inserted user id:", id);
}

// demoCreate();



/* ------------------------------------------------------------
   B) READ (get, getAll, get by index)
   ------------------------------------------------------------ */

async function getUserById(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllUsers(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const request = store.getAll(); // may not be supported in some older browsers

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}



/* ------------------------------------------------------------
   Read by INDEX (e.g., email)
   ------------------------------------------------------------ */

async function getUserByEmail(db, email) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const index = store.index("by_email");

    const request = index.get(email);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}



/* ------------------------------------------------------------
   C) UPDATE / UPSERT (put)
   ------------------------------------------------------------
   ✔ put inserts if not exists, updates if exists.
*/

async function updateUser(db, user) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const request = store.put(user); // must include key field (id)

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}



/* ------------------------------------------------------------
   D) DELETE (delete)
   ------------------------------------------------------------ */

async function deleteUser(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}



/* ============================================================
   5. USING CURSORS (ITERATING OVER LARGE DATASETS)
   ============================================================
   ✔ store.openCursor() lets you iterate over records one by one.
   ✔ Useful for large datasets or conditional filtering.
*/

async function getUsersByAgeRange(db, minAge, maxAge) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const results = [];

    // openCursor() without range → iterate over all records
    const request = store.openCursor();

    request.onsuccess = event => {
      const cursor = event.target.result;
      if (cursor) {
        const user = cursor.value;
        if (user.age >= minAge && user.age <= maxAge) {
          results.push(user);
        }
        cursor.continue(); // move to next record
      } else {
        // no more records
        resolve(results);
      }
    };

    request.onerror = () => reject(request.error);
  });
}



/* ============================================================
   6. KEY RANGES (IDBKeyRange)
   ============================================================
   ✔ You can define ranges for queries.
   API:
     IDBKeyRange.lowerBound()
     IDBKeyRange.upperBound()
     IDBKeyRange.bound()
     IDBKeyRange.only()
*/

async function getUsersStartingFromId(db, minId) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const range = IDBKeyRange.lowerBound(minId);

    const results = [];
    const request = store.openCursor(range);

    request.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    request.onerror = () => reject(request.error);
  });
}



/* ============================================================
   7. TRANSACTION LIFETIME & ERROR HANDLING
   ============================================================
   ✔ A transaction is ACTIVE only during the current event loop tick.
   ✔ You MUST start all operations (get/add/put/delete) synchronously
     after creating tx; cannot store tx and use it later asynchronously.

   ✔ Errors:
       tx.onerror    → any operation fails
       tx.oncomplete → all operations success
*/

async function demoTransaction(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");

    store.add({ name: "Tom", email: "tom@example.com", age: 30 });
    store.add({ name: "Jerry", email: "jerry@example.com", age: 29 });

    tx.oncomplete = () => {
      console.log("Transaction complete");
      resolve();
    };

    tx.onerror = () => {
      console.error("Transaction error:", tx.error);
      reject(tx.error);
    };
  });
}



/* ============================================================
   8. CLEARING & DELETING
   ============================================================
   A) Clear object store: store.clear()
   B) Delete database: indexedDB.deleteDatabase(name)
*/

async function clearUsers(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function deleteDB(name = "MyAppDB") {
  const request = indexedDB.deleteDatabase(name);

  request.onsuccess = () => console.log("DB deleted");
  request.onerror = () => console.log("Error deleting DB");
  request.onblocked = () =>
    console.log("Delete blocked (close all tabs using this DB)");
}



/* ============================================================
   9. INDEXEDDB USE-CASES
   ============================================================
   ✔ Offline-first apps & PWAs
   ✔ Caching API responses (e.g., large JSON)
   ✔ Storing user preferences & app state
   ✔ Local data for notes, todos, email clients, etc.
   ✔ Large files (blobs), images, audio, video metadata
*/



/* ============================================================
   10. INDEXEDDB VS localStorage
   ============================================================
   localStorage:
     ✔ simple key-value (string only)
     ✔ synchronous (blocking)
     ✔ size limit smaller

   IndexedDB:
     ✔ complex structured data (objects, blobs, arrays)
     ✔ asynchronous & non-blocking
     ✔ transactions & indexes
     ✔ better for large data, serious offline apps
*/



/* ============================================================
   11. BEST PRACTICES
   ============================================================
*/
/*
  ✔ Use a wrapper (Promises / async/await) to avoid callback hell.
  ✔ Version your DB carefully — use onupgradeneeded for schema changes.
  ✔ Use indexes for frequently queried fields (e.g., email, name).
  ✔ Use transactions to group related operations atomically.
  ✔ Limit the amount of data you store (respect user’s device).
  ✔ Use try/catch for async code; handle errors & blocked events.
  ✔ Combine with Service Workers for offline-first PWAs:
      - Service Worker uses IndexedDB as storage for offline data.
*/



/* ============================================================
   12. MINI WRAPPER EXAMPLE (HIGH-LEVEL API)
   ============================================================
   Simple helper object for common operations.
*/

const DB = {
  db: null,

  async init() {
    if (this.db) return this.db;
    this.db = await openDBPromise("MyAppDB", 1, (db) => {
      if (!db.objectStoreNames.contains("users")) {
        const store = db.createObjectStore("users", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("by_email", "email", { unique: true });
      }
    });
    return this.db;
  },

  async addUser(user) {
    const db = await this.init();
    return addUser(db, user);
  },

  async getUser(id) {
    const db = await this.init();
    return getUserById(db, id);
  },

  async getAllUsers() {
    const db = await this.init();
    return getAllUsers(db);
  },

  async updateUser(user) {
    const db = await this.init();
    return updateUser(db, user);
  },

  async deleteUser(id) {
    const db = await this.init();
    return deleteUser(db, id);
  },
};

// Example Usage:
// (async () => {
//   const id = await DB.addUser({ name: "Bob", email: "bob@example.com", age: 35 });
//   console.log("New user id:", id);
//   const user = await DB.getUser(id);
//   console.log("User fetched:", user);
// })();



/* ============================================================
   13. SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ IndexedDB:
      - Asynchronous, key-value database in the browser.
      - Stores objects, blobs, large amounts of data.
      - Uses object stores & indexes for fast queries.
      - Transactions ensure atomicity.

  ✔ Important APIs:
      - indexedDB.open(name, version)
      - db.createObjectStore(name, options)
      - store.add(), store.put(), store.get(), store.delete(), store.clear()
      - store.openCursor(), store.index(name)
      - IDBKeyRange.bound(), lowerBound(), upperBound(), only()
      - indexedDB.deleteDatabase(name)

  ✔ Lifecycle:
      - onupgradeneeded → create/modify stores & indexes
      - onsuccess → DB ready to use
      - onerror → handle failures

  MENTAL MODEL:
    → IndexedDB is like a small NoSQL database in the browser.
      Use it when localStorage is too small or too simple,
      and you need real database features on the client side.
*/
