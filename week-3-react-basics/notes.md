# Basic React JS — Learning Notes

**Week 3 Deliverable — Frontend Advanced**
Case study project: `Student Dashboard` (see `react-basics.html` in this folder)

---

## 1. Why React

React is a JavaScript library for building UIs out of small, reusable **components**. Instead of manually updating the DOM when data changes, you describe *what the UI should look like for a given state*, and React figures out the minimal changes needed to make the real page match.

---

## 2. Core Concepts Covered

### Virtual DOM

The Virtual DOM is a lightweight in-memory copy of the real DOM. When state or props change, React first updates this virtual copy, compares ("diffs") it against the previous version, and then applies **only the minimal necessary changes** to the actual browser DOM.

This matters because directly manipulating the real DOM is slow. By batching and minimizing real DOM updates, React keeps the UI fast even as data changes frequently.

**In the project:** every time `handleAddStudent()` runs, the `students` state changes, React re-renders the `StudentList`, and only the new `StudentCard` is actually added to the real DOM — the existing cards aren't touched.

---

### JSX

JSX is a syntax extension that lets you write HTML-like markup directly inside JavaScript. It isn't valid browser JavaScript on its own — it gets compiled (here, by Babel) into regular `React.createElement()` calls.

```jsx
// JSX
const el = <h1>Hello</h1>;

// Compiles to roughly:
const el = React.createElement("h1", null, "Hello");
```

JSX makes component structure easy to read at a glance instead of buried in nested function calls.

---

### Components (Functional and Class)

A **component** is a reusable, self-contained piece of UI. React supports two styles:

| | Functional | Class |
|---|---|---|
| Syntax | Plain JavaScript function | `class X extends React.Component` |
| State | via `useState` hook | via `this.state` |
| Lifecycle | via `useEffect` hook | via lifecycle methods |
| Modern usage | Preferred / most common today | Still used, especially in older codebases |

```jsx
// Functional
function StudentCard({ name, score }) {
  return <div>{name}: {score}</div>;
}

// Class
class Clock extends React.Component {
  render() {
    return <div>{this.state.time}</div>;
  }
}
```

**In the project:** `StudentCard`, `StudentList`, and `App` are functional components. `Clock` is a class component — deliberately included to demonstrate both styles side by side.

---

### Props

**Props** ("properties") are how data flows *down* from a parent component to a child. They are read-only from the child's perspective — a child component should never modify its own props directly.

```jsx
<StudentCard name="Amaka" score={78} />

function StudentCard(props) {
  return <div>{props.name}: {props.score}</div>;
}
```

**In the project:** `App` owns the `students` array in state and passes it down to `StudentList`, which passes individual student data down to each `StudentCard`.

---

### State

**State** is data that belongs to a component and can change over time. When state updates, React automatically re-renders the component (and its children) to reflect the new value.

```jsx
const [students, setStudents] = useState([...]);
// students  → current value
// setStudents → function used to update it and trigger a re-render
```

**In the project:** `App`'s `students` state starts with 3 students; clicking the button updates it via `setStudents([...students, newStudent])`, which re-renders the list.

---

### Lifecycle (Class Methods & `useEffect`)

Lifecycle refers to the stages a component goes through: **mounting** (first appears), **updating** (re-renders due to new state/props), and **unmounting** (removed from the page).

- **Class components** use methods: `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount()`
- **Functional components** use the `useEffect()` hook to achieve the same thing

```jsx
// Class — runs once when the component first mounts
componentDidMount() {
  this.timerID = setInterval(() => { ... }, 1000);
}
componentWillUnmount() {
  clearInterval(this.timerID); // cleanup, avoids memory leaks
}

// Functional equivalent
useEffect(() => {
  console.log("students changed:", students);
}, [students]); // re-runs whenever `students` changes
```

**In the project:** `Clock` starts a `setInterval` timer in `componentDidMount` and clears it in `componentWillUnmount`. `App` uses `useEffect` to log to the console whenever the `students` list changes.

---

### Fragment

A Fragment (`<>...</>` or `<React.Fragment>...</React.Fragment>`) lets a component return multiple elements without wrapping them in an extra `<div>`. This avoids unnecessary nesting in the actual rendered HTML.

```jsx
function App() {
  return (
    <>
      <StudentList students={students} />
      <Clock />
    </>
  );
}
```

**In the project:** both `StudentList` and `App` return multiple sibling elements using a Fragment instead of a wrapping `<div>`.

---

### Event Handlers

React uses **camelCase** event names (`onClick`, not `onclick`) and passes a function reference, not a string, as the handler.

```jsx
<button onClick={handleAddStudent}>+ Add Random Student</button>

function handleAddStudent() {
  setStudents([...students, newStudent]); // updates state → triggers re-render
}
```

**In the project:** clicking "+ Add Random Student" runs `handleAddStudent`, which updates state and causes React to re-render the student list with the new entry.

---

## 3. Case Study Summary

The **Student Dashboard** combines every concept above:

1. **JSX** throughout for all markup
2. **Functional components** (`StudentCard`, `StudentList`, `App`) and a **class component** (`Clock`)
3. **Props** flow from `App` → `StudentList` → `StudentCard`
4. **State** (`useState`) drives the student list and the live clock
5. **Lifecycle** — `componentDidMount`/`componentWillUnmount` in `Clock`, `useEffect` in `App`
6. **Fragments** avoid unnecessary wrapper `<div>`s
7. **Event handler** (`onClick`) adds a new student and triggers a re-render
8. **Virtual DOM** — visible in practice: only the new card is added to the real DOM, existing ones are untouched

This satisfies the deliverable: *"Presentation of Study/Practise of learning outcome."*

---

## 4. How to Run

No build tools or npm install needed — just open `react-basics.html` directly in a browser (React, ReactDOM, and Babel are loaded via CDN). Open DevTools (F12) → Console to see the lifecycle logs as the Clock mounts and the student list updates.

---

## 5. Resources

- Resource 1 (React documentation)
- Resource 2 (React documentation)