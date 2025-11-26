/*
  FETCH API + HTTP REQUESTS IN JAVASCRIPT — DETAILED EXPLANATION
  --------------------------------------------------------------
  ✔ fetch() is the modern way to make HTTP requests in JS
  ✔ Works in browser + modern Node.js (v18+)
  ✔ Returns a PROMISE
  ✔ Supports:
        - GET, POST, PUT, DELETE, PATCH...
        - JSON requests/responses
        - Headers
        - Error handling
        - Streaming responses
*/



/* ============================================================
   1. BASIC FETCH (GET REQUEST)
   ============================================================ */
/*
  fetch(url)
    → returns a Promise that resolves to a Response object
*/

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => {
    /*
      response.status → HTTP status code (200, 404, 500...)
      response.ok     → true if status between 200–299
      response.json() → returns another Promise (JSON parsed)
    */
    return response.json();
  })
  .then(data => {
    console.log("GET response:", data);
  })
  .catch(error => {
    console.log("Network error:", error);
  });



/* ============================================================
   2. BASIC FETCH USING async/await (RECOMMENDED)
   ============================================================ */

async function getPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    if (!response.ok) {
      throw new Error("HTTP Error " + response.status);
    }

    const data = await response.json();
    console.log("Async GET:", data);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

// getPost();



/* ============================================================
   3. POST REQUEST (SEND DATA)
   ============================================================ */

async function createPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // required for JSON
      },
      body: JSON.stringify({
        title: "New Post",
        body: "Learning fetch API",
        userId: 1
      })
    });

    const data = await response.json();
    console.log("POST response:", data);
  } catch (err) {
    console.log("POST error:", err);
  }
}

// createPost();



/* ============================================================
   4. PUT REQUEST (UPDATE FULL RESOURCE)
   ============================================================ */

async function updatePost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 1,
      title: "Updated Title",
      body: "Updated Content",
      userId: 1
    })
  });

  const data = await response.json();
  console.log("PUT response:", data);
}



// updatePost();



/* ============================================================
   5. PATCH REQUEST (PARTIAL UPDATE)
   ============================================================ */

async function patchPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Partially Updated Title"
    })
  });

  const data = await response.json();
  console.log("PATCH response:", data);
}

// patchPost();



/* ============================================================
   6. DELETE REQUEST
   ============================================================ */

async function deletePost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
  });

  console.log("DELETE status:", response.status);
}

// deletePost();



/* ============================================================
   7. CUSTOM HEADERS
   ============================================================ */

fetch("https://jsonplaceholder.typicode.com/posts", {
  headers: {
    "Authorization": "Bearer 123ABC",
    "Custom-Header": "HelloWorld"
  }
})
  .then(res => res.json())
  .then(data => console.log("Custom headers result:", data));



/* ============================================================
   8. HANDLING ERRORS PROPERLY
   ============================================================ */
/*
  IMPORTANT:
    fetch() only rejects on NETWORK errors (DNS fail, offline, CORS issue).
    It DOES NOT reject for HTTP status errors like 404, 500.

    So must check response.ok manually.
*/

async function safeFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    console.log("safeFetch data:", data);
  } catch (e) {
    console.log("safeFetch error:", e.message);
  }
}

// safeFetch("https://jsonplaceholder.typicode.com/unknown"); // 404



/* ============================================================
   9. FETCH TIMEOUT (USING AbortController)
   ============================================================ */

async function fetchWithTimeout(url, timeout = 2000) {
  const controller = new AbortController();

  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);

    const data = await res.json();
    console.log("Timeout fetch data:", data);
  } catch (err) {
    console.log("Timeout fetch error:", err.name); // AbortError
  }
}

// fetchWithTimeout("https://jsonplaceholder.typicode.com/posts", 100);



/* ============================================================
   10. FETCH TEXT, BLOB, ARRAYBUFFER
   ============================================================ */

async function fetchTypes() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  const text = await res.text();
  // const blob = await res.blob();
  // const buffer = await res.arrayBuffer();

  console.log("Text data:", text);
}

// fetchTypes();



/* ============================================================
   11. FETCH STREAMING (ADVANCED)
   ============================================================ */
/*
  ✔ You can read response body as a stream
  ✔ Useful for large files
*/

async function fetchStream() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const reader = res.body.getReader();

  const decoder = new TextDecoder();
  let chunk;
  let result = "";

  while (!(chunk = await reader.read()).done) {
    result += decoder.decode(chunk.value, { stream: true });
  }

  console.log("Streamed result:", result);
}

// fetchStream();



/* ============================================================
   12. FETCH + async/await Error Pattern (Best Practice)
   ============================================================ */

async function loadJSON(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }

  return res.json();
}

async function loadData() {
  try {
    const posts = await loadJSON("https://jsonplaceholder.typicode.com/posts");
    const users = await loadJSON("https://jsonplaceholder.typicode.com/users");

    console.log(posts.length, "posts loaded");
    console.log(users.length, "users loaded");
  } catch (err) {
    console.log("loadData error:", err.message);
  }
}

// loadData();



/* ============================================================
   13. FETCH VS AXIOS (Quick Comparison)
   ============================================================
   fetch:
     ✔ built-in
     ✔ returns response object → must call response.json()
     ✔ no automatic error for 404/500
     ✔ must manually set timeout using AbortController
     ✔ slightly lower-level

   axios:
     ✔ auto JSON transform
     ✔ auto reject on non-2xx
     ✔ built-in timeout
     ✔ smaller code for requests

   DIFFERENCE: fetch is native, axios is library.
*/



/* ============================================================
   14. SUMMARY OF FETCH API
   ============================================================
/*
  ✔ fetch() returns a Promise
  ✔ MUST call response.json()/.text()/.blob()
  ✔ fetch only rejects on NETWORK error (not HTTP errors)
  ✔ use response.ok + response.status for server errors
  ✔ supports:
      - GET / POST / PUT / PATCH / DELETE
      - headers
      - body data (JSON, text, forms)
      - AbortController for cancellation
      - Streams

  MENTAL MODEL:
    → fetch sends a request, returns Response object
    → Response is like an envelope: open it using .json() or .text()
*/
