/*
  WEBSOCKETS IN JAVASCRIPT — GREAT DETAIL
  ---------------------------------------
  ✔ WebSockets provide FULL-DUPLEX, bidirectional, real-time communication
    between browser and server over a persistent connection.

  ✔ Unlike HTTP:
      - HTTP is request-response (client must initiate)
      - WebSockets allow BOTH client and server to send messages ANYTIME

  ✔ Used for:
      - Chats, real-time messaging
      - Multiplayer games
      - Live dashboards / real-time analytics
      - Stock market tickers
      - Notifications
      - Collaborative editing (Google Docs style)
*/



/* ============================================================
   1. HOW WEBSOCKETS WORK (FLOW)
   ============================================================
*/
/*
  1) Client requests an UPGRADE from HTTP → WebSocket:
       GET /chat HTTP/1.1
       Upgrade: websocket
       Connection: Upgrade
       Sec-WebSocket-Key: <random>
       Sec-WebSocket-Version: 13

  2) If server accepts:
       HTTP/1.1 101 Switching Protocols
       Upgrade: websocket
       Connection: Upgrade
       Sec-WebSocket-Accept: <hashed key>

  3) Connection switches to WebSocket protocol (ws:// or wss://)
  4) Now both sides can send messages freely.

  WS protocol:
      - ws://   = insecure (like http)
      - wss://  = secure (like https)
*/



/* ============================================================
   2. BROWSER WEBSOCKET API
   ============================================================
   ✔ Very simple — just use new WebSocket(url)
*/

const socket = new WebSocket("wss://echo.websocket.org");

/*
  WEBSOCKET EVENTS:
    - open
    - message
    - error
    - close
*/

socket.addEventListener("open", () => {
  console.log("Connected to server!");
  socket.send("Hello Server!");        // send message to server
});

socket.addEventListener("message", (event) => {
  console.log("Received:", event.data);
});

socket.addEventListener("error", (err) => {
  console.log("WebSocket error:", err);
});

socket.addEventListener("close", () => {
  console.log("Connection closed.");
});



/* ============================================================
   3. SENDING DATA OVER WEBSOCKET
   ============================================================
   ✔ You can send:
       - strings
       - JSON (stringified)
       - ArrayBuffer / Blob (binary)
*/

socket.send("Plain text message");

socket.send(JSON.stringify({
  type: "chat",
  user: "Alice",
  text: "Hello!",
}));

// binary data
const buffer = new Uint8Array([1, 2, 3]);
socket.send(buffer);



/* ============================================================
   4. RECEIVING DATA
   ============================================================
*/

socket.onmessage = (event) => {
  console.log("Server says:", event.data);

  // Parse JSON if necessary
  try {
    const data = JSON.parse(event.data);
    console.log("Parsed JSON:", data);
  } catch {}
};



/* ============================================================
   5. HANDLING CONNECTION CLOSE
   ============================================================
*/

socket.onclose = (event) => {
  console.log("Socket closed with code:", event.code);
  console.log("Reason:", event.reason);
  console.log("Was clean?:", event.wasClean);
};



/* ============================================================
   6. RECONNECT LOGIC (AUTO-RETRY)
   ============================================================
   ✔ WebSockets do NOT auto-reconnect.
   ✔ You must handle reconnection manually.
*/

function createSocket() {
  let ws = new WebSocket("wss://example.com");
  let reconnectTimeout = 1000;

  ws.onopen = () => {
    console.log("Connected!");
    reconnectTimeout = 1000; // reset timeout
  };

  ws.onclose = () => {
    console.log("Disconnected. Reconnecting...");
    setTimeout(createSocket, reconnectTimeout);
    reconnectTimeout = Math.min(reconnectTimeout * 2, 30000); // exponential backoff
  };

  ws.onerror = () => {
    ws.close();
  };

  return ws;
}

let wsConnection = createSocket();



/* ============================================================
   7. SERVER-SIDE EXAMPLE (NODE.JS + ws library)
   ============================================================
   Install:
     npm install ws
*/

/// server.js (Node.js)
/// -------------------
/*
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (data) => {
    console.log("Received:", data);
    socket.send("Echo: " + data); // send data back
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
*/



/* ============================================================
   8. SECURE WEBSOCKETS (wss://)
   ============================================================
   ✔ Works over HTTPS
   ✔ Required for production
   ✔ Use TLS certificates on server

   Example:
     const server = https.createServer({ cert, key })
     const wss = new WebSocket.Server({ server });
*/



/* ============================================================
   9. HEARTBEAT / KEEP-ALIVE (PREVENT TIMEOUT)
   ============================================================
   ✔ Many proxies disconnect idle connections.
   ✔ Solution: send periodic pings.
*/

function heartbeat(socket) {
  setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "ping" }));
    }
  }, 30000);
}



/* ============================================================
   10. WEBSOCKET READY STATES
   ============================================================
*/
/*
  WebSocket.readyState values:

  0 → CONNECTING
  1 → OPEN
  2 → CLOSING
  3 → CLOSED

  Example:
*/

if (socket.readyState === WebSocket.OPEN) {
  socket.send("Message only if open");
}



/* ============================================================
   11. BINARY DATA & FILE TRANSFER
   ============================================================
   ✔ WebSockets support binary frames for:
       - files
       - audio
       - images
       - blobs
*/

const ws2 = new WebSocket("wss://example.com");
ws2.binaryType = "arraybuffer";

ws2.onmessage = (event) => {
  const data = event.data; // ArrayBuffer
  console.log("Binary length:", data.byteLength);
};



/* ============================================================
   12. BROADCASTING TO ALL CLIENTS (SERVER SIDE)
   ============================================================
*/

/// Node.js + ws example
/*
function broadcast(message) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

broadcast("Server says hello to all!");
*/



/* ============================================================
   13. COMPARISON: WEBSOCKETS vs SSE vs LONG-POLLING
   ============================================================
*/
/*
  WEBSOCKETS:
    ✔ full-duplex (two-way)
    ✔ best for chat, games, live updates
    ✔ binary + text
    ✔ persistent connection

  SSE (Server-Sent Events):
    ✔ server → client only
    ✔ auto-reconnect
    ✔ simpler
    ✔ text-only

  Long-polling (traditional):
    ✔ fallback for old browsers
    ✘ inefficient
    ✘ high latency
*/



/* ============================================================
   14. USE CASES FOR WEBSOCKETS
   ============================================================
*/
/*
  ✔ Chat applications
  ✔ Multiplayer games
  ✔ IoT live streams
  ✔ Real-time notifications
  ✔ Collaboration tools (editor, whiteboard)
  ✔ Stock prices & crypto tickers
  ✔ Live dashboards
  ✔ Live location trackers
*/



/* ============================================================
   15. BEST PRACTICES
   ============================================================
*/
/*
  ✔ Handle reconnection logic
  ✔ Compress messages (JSON schema, short keys)
  ✔ Do heartbeat pings/pongs
  ✔ Validate incoming data (security)
  ✔ Limit message size
  ✔ Handle high loads via clustering
  ✔ Use wss:// in production
*/



/* ============================================================
   SUMMARY (CHEAT SHEET)
   ============================================================
*/
/*
  ✔ WebSockets establish a FULL-DUPLEX real-time connection
    between client & server.

  ✔ Key methods:
      const ws = new WebSocket("wss://example.com");
      ws.send(data);
      ws.onmessage = ...
      ws.onopen = ...
      ws.onclose = ...

  ✔ Ideal for real-time apps:
      chats, live updates, multiplayer games, dashboards.

  ✔ WebSocket server example using Node.js + ws.

  MENTAL MODEL:
    → WebSockets are like opening a phone call between
      browser and server — both can talk anytime without waiting.
*/
