/****************************************************************************************
 * REACTIVE PROGRAMMING IN JAVASCRIPT — COMPLETE & DETAILED NOTES (BEGINNER → ADVANCED)
 *
 * Topics Covered:
 * ✔ What is Reactive Programming?
 * ✔ Imperative vs Reactive mindset
 * ✔ Streams, Observables, Producers, Consumers
 * ✔ Push vs Pull data models
 * ✔ Hot vs Cold Observables
 * ✔ Marble diagrams (JS version)
 * ✔ RxJS basics (Observable, Observer, Subscription)
 * ✔ Operators (map, filter, debounceTime, merge, switchMap, reduce, etc.)
 * ✔ Subjects & Multicasting (BehaviorSubject, ReplaySubject)
 * ✔ Backpressure problem
 * ✔ Schedulers (immediate, async, animationFrame)
 * ✔ Reactivity in frameworks (React, SolidJS, Vue reactivity)
 * ✔ Signals (modern reactive primitives)
 ****************************************************************************************/


/****************************************************************************************
 * 1. WHAT IS REACTIVE PROGRAMMING?
 ****************************************************************************************/
//
// Reactive programming = programming with *asynchronous data streams*.
//
// Streams:
// --------
// A stream is a sequence of values OVER TIME.
//
// Example streams:
// - Mouse clicks
// - WebSocket messages
// - API responses
// - User input events
// - Interval timers
//
// In reactive programming:
// - Data flows automatically to all dependents
// - When a source changes, everything listening updates immediately
//
// Think of it as: instead of *pulling* data, you *react* to it.
//


/****************************************************************************************
 * 2. IMPERATIVE vs REACTIVE (CONCEPT)
 ****************************************************************************************/

// Imperative:
let x = 10;
let y = x * 2; // y = 20
x = 20;
// y stays 20 ❌ (not reactive)

// Reactive (conceptually):
// y = x * 2
// x = 20 → y updates automatically to 40 ✔


// Simple conceptual reactive cell
function cell(initial) {
  let value = initial;
  const listeners = new Set();
  return {
    get: () => value,
    set: (v) => {
      value = v;
      listeners.forEach((fn) => fn(v));
    },
    subscribe: (fn) => listeners.add(fn)
  };
}

const xCell = cell(10);
xCell.subscribe((v) => console.log("Updated:", v * 2));

xCell.set(20); // triggers reactive update


/****************************************************************************************
 * 3. OBSERVABLES — CORE OF REACTIVE PROGRAMMING
 ****************************************************************************************/
//
// Observable = a function that emits values over time.
// Observer   = receives those values.
// Subscription = cancels the stream.
//
// Simplified Observable implementation:
//

function Observable(subscribeFn) {
  return {
    subscribe(observer) {
      return subscribeFn(observer);
    }
  };
}

const observable = Observable((observer) => {
  observer.next(1);
  observer.next(2);
  setTimeout(() => observer.next(3), 1000);
  return () => console.log("unsubscribed");
});

const sub = observable.subscribe({
  next: (val) => console.log("received:", val)
});
// unsubscribe after 2 seconds
setTimeout(() => sub(), 2000);


/****************************************************************************************
 * 4. PUSH vs PULL MODELS
 ****************************************************************************************/
//
// PULL model:
//   Consumer REQUESTS data.
//   (e.g., functions, promises)
//
// PUSH model:
//   Producer SENDS data when ready.
//   (e.g., observables, events)
//
// Observables are PUSH-based AND asynchronous.
// Promises are also push-based but produce a single value only.
//


/****************************************************************************************
 * 5. HOT vs COLD OBSERVABLES
 ****************************************************************************************/

//
// Cold Observable:
//   A new producer is created for each subscriber.
//   (like fetch(), interval(), file read)
//
// Hot Observable:
//   Producer is shared among subscribers.
//   (like DOM events, WebSockets)
//
// Example:
//

import { fromEvent, interval } from "rxjs";

// COLD:
const cold$ = interval(1000); // each subscriber gets independent counter

// HOT:
const hot$ = fromEvent(document, "click"); // everyone listens to SAME click stream


/****************************************************************************************
 * 6. MARBLE DIAGRAMS (JS INTERPRETATION)
 ****************************************************************************************/
//
// Time-based visualization of observables:
//
// --1--2--3--4--|
// map(x => x * 2)
// --2--4--6--8--|
//
// "|" = complete
// "x" = next value
// "#" = error
//


/****************************************************************************************
 * 7. RXJS OBSERVABLE BASICS
 ****************************************************************************************/

import { Observable as RxObservable } from "rxjs";

const stream$ = new RxObservable((observer) => {
  observer.next("A");
  observer.next("B");
  setTimeout(() => observer.next("C"), 1000);
  observer.complete();
});

// Subscribing
stream$.subscribe({
  next: console.log,
  complete: () => console.log("done")
});


/****************************************************************************************
 * 8. COMMON RXJS OPERATORS (TRANSFORM STREAMS)
 ****************************************************************************************/
//
// Operators are like array methods but for async streams.
//
// map        → transform values
// filter     → allow only some values
// debounce   → delay bursts (search bar)
// throttle   → limit max frequency
// merge      → combine streams
// switchMap  → flatten + cancel previous
// take       → take first N values
// scan       → reduce over time
//

import { map, filter, debounceTime, switchMap } from "rxjs/operators";

// Example: search bar auto-suggest
const inputBox = document.getElementById("search");

import { fromEvent } from "rxjs";

const input$ = fromEvent(inputBox, "input");

const results$ = input$.pipe(
  map((e) => e.target.value),
  debounceTime(300),
  filter((text) => text.length >= 3),
  switchMap((text) => fetch("/api?q=" + text).then((r) => r.json()))
);

results$.subscribe(console.log);


/****************************************************************************************
 * 9. SUBJECTS — MULTICAST STREAMS
 ****************************************************************************************/
//
// Subject = both Observable AND Observer
//
// Types:
// ✔ Subject (basic multicaster)
// ✔ BehaviorSubject (stores last value)
// ✔ ReplaySubject (stores many past values)
// ✔ AsyncSubject (emits last value only on complete)
//

import { Subject, BehaviorSubject } from "rxjs";

const subject = new Subject();

subject.subscribe((v) => console.log("A:", v));
subject.subscribe((v) => console.log("B:", v));

subject.next(10); // both subscribers receive 10


/****************************************************************************************
 * 10. BACKPRESSURE — WHEN DATA FLOWS TOO FAST
 ****************************************************************************************/
//
// Backpressure = producer emits values faster than consumer can process.
//
// Solutions:
// ✔ throttleTime
// ✔ debounceTime
// ✔ bufferTime
// ✔ sample
// ✔ pausable streams
//


/****************************************************************************************
 * 11. SCHEDULERS — CONTROL WHEN OBSERVABLES RUN
 ****************************************************************************************/
//
// Schedulers control concurrency:
// ✔ queueScheduler        — synchronous queue
// ✔ asapScheduler         — before next microtask
// ✔ asyncScheduler        — setTimeout-like
// ✔ animationFrameScheduler — paint cycles
//
// Example:
import { asyncScheduler } from "rxjs";

const async$ = new RxObservable((obs) => {
  asyncScheduler.schedule(() => obs.next("async run"));
});

async$.subscribe(console.log);


/****************************************************************************************
 * 12. REACTIVITY IN MODERN FRAMEWORKS
 ****************************************************************************************/

//
// React:
//   - Uses virtual DOM + state updates (not purely reactive)
//   - Libraries like RxJS integrate well
//
// Vue/Solid/Svelte:
//   - Use fine-grained reactivity
//   - They track dependencies automatically
//
// Example (Vue-like reactivity):

function reactive(obj) {
  const listeners = new Map();
  return new Proxy(obj, {
    get(target, prop) {
      if (!listeners.has(prop)) listeners.set(prop, new Set());
      if (currentEffect) listeners.get(prop).add(currentEffect);
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      listeners.get(prop)?.forEach((fn) => fn());
      return true;
    }
  });
}

let currentEffect = null;

function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

const state = reactive({ count: 0 });
effect(() => console.log("Count:", state.count));
state.count++; // triggers reactivity


/****************************************************************************************
 * 13. SIGNALS (Next-generation Reactivity)
 ****************************************************************************************/
//
// A signal is a value holder with automatic dependency tracking.
//
// Example (SolidJS-like):
//

function signal(val) {
  let v = val;
  const subs = new Set();
  return {
    get() {
      if (currentEffect) subs.add(currentEffect);
      return v;
    },
    set(newVal) {
      v = newVal;
      subs.forEach((fn) => fn());
    }
  };
}

const count = signal(0);
effect(() => console.log("signal:", count.get()));
count.set(5);


/****************************************************************************************
 * FINAL MASTER SUMMARY
 ****************************************************************************************/
//
// ✔ Reactive programming = reacting to async data streams
// ✔ Observables emit values over time
// ✔ Reactive push model: data pushes → consumers react
// ✔ Hot vs Cold streams
// ✔ RxJS operators: map, filter, debounce, switchMap, merge
// ✔ Subjects are multicasting observables
// ✔ Backpressure happens when data is too fast
// ✔ Schedulers control concurrency
// ✔ Frameworks use reactivity under the hood: proxies, signals
