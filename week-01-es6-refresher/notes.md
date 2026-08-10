# Week 1 — JavaScript Refresher (ES6 Features)

**Stage:** Advanced Frontend Development
**Duration:** 1 week

## Learning Outcome
Understand and apply core ES6 (ECMAScript 2015) features, and demonstrate them through a working case-study project that touches: scope, `let`/`const`, arrow functions, array methods, and objects.

---

## 1. Scope (`let` vs `var`)

Before ES6, `var` was function-scoped — it "leaked" outside blocks like `if` or `for`. `let` and `const` are **block-scoped**: they only exist inside the `{ }` where they're declared.

```js
if (true) {
  let x = 5;
}
// x is not accessible here — it's out of scope
```

This matters because block scoping prevents accidental variable overwrites in loops, conditionals, and nested functions — a common source of bugs in older JS code.

## 2. `let`

Declares a variable that **can be reassigned**, but is scoped to its block. Use it for values that change over time (counters, accumulators, loop variables).

```js
let score = 0;
score = score + 10; // valid
```

## 3. `const`

Declares a variable that **cannot be reassigned** after its initial value. Use it as the default for anything that shouldn't change — most variables in modern JS should be `const` unless you specifically need to reassign them.

```js
const PASS_MARK = 50;
// PASS_MARK = 60; // this would throw an error
```

Note: `const` prevents *reassignment*, not mutation. You can still push into a `const` array or change a property on a `const` object — the variable name just can't point to a new value.

## 4. Arrow Functions

A shorter syntax for writing functions, useful for one-line logic and callbacks (especially inside array methods).

```js
// Traditional
function double(n) { return n * 2; }

// Arrow
const double = (n) => n * 2;
```

Key things to know:
- No `function` keyword, no `return` needed for single-expression bodies.
- If the body has more than one statement, you need `{ }` and an explicit `return`.
- Arrow functions don't bind their own `this` — so they're not ideal for defining object methods, but perfect for short callbacks.

## 5. Array Methods — `map`, `filter`, `reduce`, `forEach`

These four methods are the backbone of working with arrays in modern JS. They all take a callback function.

| Method | Purpose | Returns |
|---|---|---|
| `map()` | Transforms every item into something new | A new array (same length) |
| `filter()` | Keeps only items that pass a test | A new array (shorter or equal length) |
| `reduce()` | Combines all items into a single value | One value (number, object, etc.) |
| `forEach()` | Runs a function on every item, for side effects | Nothing (`undefined`) |

```js
const scores = [45, 78, 92, 38, 60];

const doubled = scores.map(s => s * 2);           // transform
const passed = scores.filter(s => s >= 50);        // select
const total = scores.reduce((sum, s) => sum + s, 0); // combine
scores.forEach(s => console.log(s));                // just log, no return
```

Rule of thumb: if you need a new array of the same size → `map`. If you need a subset → `filter`. If you need one final value (sum, average, object) → `reduce`. If you're just performing an action (like logging or updating the DOM) → `forEach`.

## 6. Objects

Objects group related data as key-value pairs. In ES6-style code, arrays of objects are the standard way to represent structured data (e.g. a list of students, products, or tasks).

```js
const student = {
  name: "Amaka",
  score: 78,
};

// Spreading an object to create a modified copy
const graded = { ...student, result: "Pass" };
```

The spread operator (`...`) is commonly paired with objects and arrays in ES6 to copy or merge data without mutating the original.

---

## Quick Reference — Other ES6 Features
*(Not required for this week's deliverable, but useful to recognize when you see them.)*

| Feature | What it does |
|---|---|
| Destructuring (`{a,b}`, `[a,b]`) | Unpacks object/array values into variables |
| Spread (`...`) | Expands an array/object into individual elements |
| `for...of` | Loops over iterable values (arrays, strings, etc.) |
| `Map` / `Set` | Key-value store and unique-value collection, alternatives to plain objects/arrays |
| Classes | Template syntax for creating objects with shared structure |
| Promises | Represents the eventual result of an async operation |
| Default & Rest parameters | Set fallback values or capture extra function arguments |
| Modules (`import`/`export`) | Split code across multiple files |

---

## Deliverable Demonstrated
The case study (`index.html` + `script.js` in this folder) is a **Student Grade Tracker** that:
- Uses `let`/`const` appropriately
- Demonstrates block scope
- Uses arrow functions throughout
- Applies `map`, `filter`, `reduce`, and `forEach` on an array of student objects
- Renders the result to a simple HTML webpage, with matching output logged to the console