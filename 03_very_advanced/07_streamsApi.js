/*
  STREAMS API IN JAVASCRIPT — GREAT DETAIL
  ----------------------------------------
  ✔ The Streams API enables reading, writing, transforming,
    and piping data IN CHUNKS instead of loading everything at once.

  ✔ WHY STREAMS?
      - Efficient memory usage
      - Handle LARGE data (video, audio, huge JSON files)
      - Real-time processing (network streaming)
      - Faster time-to-first-byte (TTFB)
      - Pause / resume capabilities
      - Works in browsers + Node.js (slightly different APIs)

  ✔ TYPES OF STREAMS:
      1) Readable Streams
      2) Writable Streams
      3) Transform Streams (Readable → Writable)
*/



/* ============================================================
   1. READABLE STREAM — BASIC OVERVIEW
   ============================================================ */
/*
  ✔ A ReadableStream is a source of data.
  ✔ The consumer reads chunks from it using:
       - getReader()
       - async iteration
       - pipeTo()
       - pipeThrough()

  ✔ Important concepts:
       - controller.enqueue(chunk)
       - controller.close()
       - reader.read()
*/



/* ------------------------------------------------------------
   EXAMPLE: Custom ReadableStream
   ------------------------------------------------------------ */

const readable = new ReadableStream({
  start(controller) {
    controller.enqueue("chunk 1");
    controller.enqueue("chunk 2");
    controller.close(); // marks end of stream
  }
});

const reader = readable.getReader();

async function readChunks() {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log("Read:", value);
  }
}

// readChunks();



/* ============================================================
   2. READABLE STREAM USING FOR-AWAIT-OF
   ============================================================ */

async function readWithForAwait() {
  for await (const chunk of readable) {
    console.log("Chunk from async iterator:", chunk);
  }
}



/* ============================================================
   3. WRITABLE STREAM — BASIC OVERVIEW
   ============================================================ */
/*
  ✔ A WritableStream receives data chunks and processes them.

  ✔ write(chunk)
  ✔ close()
  ✔ abort()
*/

const writable = new WritableStream({
  write(chunk) {
    console.log("Writing:", chunk);
  },
  close() {
    console.log("Writable closed");
  },
  abort(reason) {
    console.log("Writable aborted:", reason);
  }
});

async function writeToStream() {
  const writer = writable.getWriter();
  await writer.write("hello");
  await writer.write("world");
  await writer.close();
}

// writeToStream();



/* ============================================================
   4. TRANSFORM STREAM — PROCESS DATA PIPELINE
   ============================================================ */
/*
  ✔ TransformStream = ReadableStream + WritableStream combo
  ✔ Useful for:
       - compression
       - encryption
       - text processing
       - streaming JSON parsing
*/

const upperCaseTransform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  }
});

const readable2 = new ReadableStream({
  start(controller) {
    controller.enqueue("hello ");
    controller.enqueue("world");
    controller.close();
  }
});

const writable2 = new WritableStream({
  write(chunk) {
    console.log("Transformed:", chunk);
  }
});

// Pipe flow: readable → transform → writable
// readable2.pipeThrough(upperCaseTransform).pipeTo(writable2);



/* ============================================================
   5. PIPE METHODS
   ============================================================ */
/*
  ✔ pipeTo() — sends data from readable → writable
  ✔ pipeThrough() — readable → transform → readable
*/

/// pipeTo example:
// readable.pipeTo(writable);

/// pipeThrough example:
// readable.pipeThrough(upperCaseTransform).pipeTo(writable);




/* ============================================================
   6. STREAMING FETCH (FETCH STREAMS)
   ============================================================
   ✔ fetch() returns a Response with a ReadableStream body.
   ✔ You can read network data chunk-by-chunk!
*/

async function fetchStreamExample() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const stream = response.body;   // ReadableStream

  const reader = stream.getReader();
  let received = 0;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    received += value.length;
    console.log("Received chunk size:", value.length);
  }

  console.log("Total bytes:", received);
}



/* ============================================================
   7. TEXT DECODER STREAM + TEXT ENCODER STREAM
   ============================================================ */
/*
  ✔ These transform streams convert binary → text and vice-versa.
*/

const textDecoderStream = new TextDecoderStream();
const textEncoderStream = new TextEncoderStream();

// Example:
// response.body.pipeThrough(textDecoderStream);



/* ============================================================
   8. JSON STREAM PARSING (ADVANCED)
   ============================================================ */
/*
  Method:
     fetch readable stream
       → decode with TextDecoderStream
       → split by lines/chunks
       → parse JSON incrementally
*/

async function streamJSON(url) {
  const response = await fetch(url);

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  let text = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    text += value;
  }

  const json = JSON.parse(text);
  console.log("JSON:", json);
}



/* ============================================================
   9. QUEUEING STRATEGIES (High/Low Water Marks)
   ============================================================
   ✔ Controls backpressure (flow control)
   ✔ Defines how much data the stream should buffer.
*/

const limitedReadable = new ReadableStream({
  start(controller) {
    controller.enqueue("A");
    controller.enqueue("B");
    controller.enqueue("C");
    controller.close();
  }
}, {
  highWaterMark: 1   // small buffer → apply pressure quickly
});



/* ============================================================
   10. BACKPRESSURE (VERY IMPORTANT)
   ============================================================ */
/*
  ✔ Backpressure = when writable cannot keep up with readable.
  ✔ Writable signals "slow down" to readable.
  ✔ Streams API handles backpressure automatically.

  Example:
    - writable.write() returns a promise
    - Awaiting the promise ensures pressure is managed
*/

async function writeSlowly(writable) {
  const writer = writable.getWriter();

  for (let i = 0; i < 5; i++) {
    await writer.write(`Chunk ${i}`);  // auto backpressure
    await new Promise(r => setTimeout(r, 500)); // simulate slow processing
  }

  await writer.close();
}



/* ============================================================
   11. NODE.JS STREAMS VS BROWSER STREAMS
   ============================================================ */
/*
  ✔ Node.js streams are different but conceptually similar:
      - streams.Readable
      - streams.Writable
      - streams.Transform

  ✔ Node supports:
      - file streams
      - network streams
      - gzip streams
      - etc.

  ✔ Browser Streams API is more modern, promise-based, and integrated with Fetch.
*/



/* ============================================================
   12. REAL USE CASES
   ============================================================ */
/*
  ✔ STREAMING LARGE VIDEO FILES
      fetch video in chunks, pipe to MediaSource

  ✔ STREAMING LOGS FROM SERVER
      read logs from fetch('logs/stream')

  ✔ REAL-TIME DATA PROCESSING
      financial data, sensor data

  ✔ TRANSFORMING FILES IN BROWSER
      compress using Web Streams + WebAssembly

  ✔ REACTIVE PIPELINES
      chain multiple transform streams
*/



/* ============================================================
   13. BEST PRACTICES
   ============================================================ */
/*
  ✔ Always use async iteration or getReader()
  ✔ Handle backpressure (await writer.write)
  ✔ Close streams when done
  ✔ Use TransformStream for modular pipelines
  ✔ Use TextDecoderStream to avoid manual decoding
  ✔ Use pipeTo/pipeThrough instead of manual loops when possible
*/



/* ============================================================
   SUMMARY (CHEAT SHEET)
   ============================================================ */
/*
  ✔ Streams API lets JS process data chunk-by-chunk.
  ✔ Types:
      - ReadableStream
      - WritableStream
      - TransformStream
  ✔ Key operations:
      - reader.read()
      - writer.write()
      - pipeTo()
      - pipeThrough()
  ✔ Supports:
      - fetch streaming
      - text encoding/decoding
      - pipelines
      - backpressure
  ✔ Great for:
      - large files
      - real-time data
      - efficient memory usage
*/

