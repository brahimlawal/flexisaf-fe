# Asynchronous React — Learning Notes

**Week 6 Deliverable — Frontend Advanced**
Case study project: `async-react.html` (see this folder)

---

## 1. Why Async Matters in React

Most real apps need to talk to a server — submitting a form, loading data. These operations take time and shouldn't freeze the UI while waiting. JavaScript handles this with **Promises** and **async/await**, and the response data is almost always **JSON**.

---

## 2. JSON

JSON (JavaScript Object Notation) is the standard format for sending/receiving structured data over the web. JS objects and JSON aren't quite the same thing — you convert between them:

```js
JSON.stringify(jsObject);   // JS object → JSON string (to send)
JSON.parse(jsonString);     // JSON string → JS object (received, though fetch does this via .json())
```

**In the project:** `PostForm`'s `handleSubmit` turns the form's state object into a JSON string with `JSON.stringify()` before sending it, and turns the server's JSON response back into a usable object with `res.json()`.

---

## 3. Form Data (Controlled Forms)

A "controlled" form means every input's value is driven by React state, not the DOM itself. One `onChange` handler updates state on every keystroke, so state and the visible input are always in sync.

```jsx
const [formData, setFormData] = useState({ title: "", body: "" });

function handleChange(e) {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
}

<input name="title" value={formData.title} onChange={handleChange} />
```

**In the project:** `PostForm` uses one `handleChange` for both the title and body fields, keyed off each input's `name` attribute.

---

## 4. Promises

A Promise represents a value that isn't available yet but will resolve (succeed) or reject (fail) later. `.then()` handles success, `.catch()` handles failure, and they can be chained since each `.then()` returns a new Promise.

```js
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

**In the project:** `fetchPostPromiseStyle` uses this exact chain — one `.then()` to parse the JSON, another to log the result, and a `.catch()` to handle failures.

---

## 5. Async/Await

`async/await` is built on top of Promises — it's a cleaner syntax for the same thing. Marking a function `async` lets you `await` a Promise inside it, pausing that function (not the whole app) until it resolves. Errors are caught with a normal `try/catch` instead of `.catch()`.

```js
async function fetchPost(id) {
  try {
    const res = await fetch(`.../posts/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

**In the project:** `fetchPostAsyncStyle` does the identical request as the Promise-chain version above — the app has a side-by-side button for each, so clicking both and comparing the console output makes the difference concrete.

---

## 6. Case Study Summary

The **Async React Demo** has two parts:

1. **`PostForm`** — a controlled form that builds a JSON payload from state and submits it with an `async` handler (covers JSON + Form Data + Async/Await)
2. **`PromiseVsAsync`** — the exact same GET request written two ways: a manual `.then()/.catch()` chain, and an `async/await` version — so the relationship between the two styles is visible directly, not just described (covers Promises + Async/Await)

This satisfies the deliverable: *"Presentation to show Study/Practise of learning outcome in a React Application."*

---

## 7. Resources

- [Async React](https://legacy.reactjs.org/docs/faq-ajax.html) — fetching data in React