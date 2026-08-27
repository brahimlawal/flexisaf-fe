# React Hooks — Learning Notes

**Week 5 Deliverable — Frontend Advanced**
Case study project: `react-hooks.html` (see this folder)

---

## 1. What Hooks Are

Hooks are functions that let functional components "hook into" React features — state, lifecycle-style effects, DOM refs — without needing a class component. They always start with `use` and can only be called at the top level of a component (not inside loops/conditions).

---

## 2. `useState`

Gives a functional component its own piece of state. Calling the setter triggers a re-render with the new value.

```jsx
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>+</button>
```

**In the project:** `Counter` uses `useState` to track a number that goes up/down via buttons.

---

## 3. `useEffect`

Runs a side effect after render — things like updating the page title, fetching data, or subscribing to something. The **dependency array** (`[count]`) controls when it re-runs: only when a value inside it changes.

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // re-runs only when `count` changes
```

An empty array `[]` means "run once, on mount." Returning a function from inside `useEffect` defines cleanup logic, which runs before the effect re-runs or when the component unmounts.

**In the project:** `Counter`'s effect updates the browser tab title every time `count` changes. `useFetch` (see below) uses a cleanup function to avoid setting state after unmount.

---

## 4. `useRef`

Creates a mutable value that persists across renders **without** causing a re-render when it changes — unlike state. Two common uses:

1. Directly accessing a DOM element (e.g. focusing an input)
2. Storing a value you want to keep between renders but don't need to display

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>
```

**In the project:** `FocusInput` uses one ref to grab the actual `<input>` DOM node and focus it on click, and a second ref to silently count renders without triggering extra ones.

---

## 5. Building a Custom Hook

A custom hook is just a normal function, named `useSomething`, that calls other hooks inside it. It exists purely to extract reusable logic so multiple components don't repeat the same `useState`/`useEffect` pattern.

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url).then(res => res.json()).then(json => {
      setData(json);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
}

// Used like any built-in hook:
const { data, loading } = useFetch("https://jsonplaceholder.typicode.com/posts");
```

**In the project:** `useFetch` wraps the fetch-on-mount pattern (building directly on the REST API calls from Week 4) and is reused by `PostList` to load and display posts.

---

## 6. Case Study Summary

The **Hooks Demo** covers each concept in its own section:

1. **`Counter`** — `useState` + `useEffect` (syncs count to the document title)
2. **`FocusInput`** — `useRef` (DOM access + silent render tracking)
3. **`useFetch`** — a custom hook combining `useState` + `useEffect` with cleanup
4. **`PostList`** — consumes the custom hook to fetch and render live API data

This satisfies the deliverable: *"Presentation to show Study/Practise of learning outcome in a React Application."*

---

## 7. How to Run

Open `react-hooks.html` directly in a browser (React, ReactDOM, and Babel load via CDN — no npm needed). Open DevTools (F12) → Console to see effect logs, and watch the browser tab title change as you click the counter buttons.