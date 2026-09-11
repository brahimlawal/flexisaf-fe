# State Management (Redux & Context API) — Learning Notes

**Week 7 Deliverable — Frontend Advanced**
Case study project: `state-management.html` (see this folder)

---

## 1. The Problem Being Solved

As an app grows, passing data down through many layers of props just to reach one deeply nested component gets messy — this is called "prop drilling." Both Context API and Redux solve this by giving components a way to access shared state directly, without every component in between needing to know or pass it along.

---

## 2. Context API

Context is built into React itself — no extra library needed. It has three parts:

```jsx
// 1. Create it
const ThemeContext = createContext();

// 2. Provide it — wraps the part of the tree that needs access
<ThemeContext.Provider value={{ theme, dispatch }}>
  {children}
</ThemeContext.Provider>

// 3. Consume it — any descendant, no matter how deep, can read it
const { theme, dispatch } = useContext(ThemeContext);
```

**In the project:** `ThemeProvider` wraps the app and holds the current theme (`light`/`dark`) using `useReducer`. `ThemedCard` reads and updates it via `useContext` with zero props passed down manually.

---

## 3. Redux

Redux keeps **all** app state in a single, centralized **store**, and the only way to change it is by **dispatching an action** that a **reducer** handles.

| Concept | What it is |
|---|---|
| Store | Holds the entire app's state |
| Action | A plain object describing *what happened* (`{ type: "INCREMENT" }`) |
| Reducer | A pure function: `(state, action) => newState` — never mutates state directly |
| Dispatch | The only way to trigger a state change: `store.dispatch(action)` |

```js
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "DECREMENT": return { count: state.count - 1 };
    default: return state;
  }
}

const store = Redux.createStore(counterReducer);
store.dispatch({ type: "INCREMENT" });
```

Redux's store exists independently of React — components have to explicitly **subscribe** to be notified when state changes (normally the `react-redux` library does this wiring automatically; here it's done manually with `store.subscribe()` so the mechanism itself is visible).

```jsx
useEffect(() => {
  const unsubscribe = store.subscribe(() => setState(store.getState()));
  return unsubscribe; // cleanup on unmount
}, []);
```

**In the project:** `ReduxCounter` subscribes to the store on mount, updates its local state whenever the store changes, and dispatches `INCREMENT`/`DECREMENT` actions from button clicks.

---

## 4. Context API vs Redux — When to Use Which

| | Context API | Redux |
|---|---|---|
| Setup | Built-in, no install | Separate library |
| Best for | Simpler, infrequently-changing global values (theme, logged-in user) | Larger apps with complex, frequently-changing state and many interacting pieces |
| Debugging tools | Basic (React DevTools) | Rich (Redux DevTools — time-travel debugging, action history) |

---

## 5. Case Study Summary

The **State Management Demo** places both approaches side by side:

1. **`ThemeProvider` + `ThemedCard`** — Context API, with `useReducer` managing the actual state changes
2. **`ReduxCounter`** — a real Redux store, reducer, and manual subscription, dispatching actions from the UI

This satisfies the deliverable: *"Presentation to show Study/Practise of learning outcome in a React Application."*

---

## 6. Resources

- [State Management in React with Redux Toolkit](https://dev.to/dhiwise/state-management-in-react-with-redux-toolkit-5ega)