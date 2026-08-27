# RESTful API — Learning Notes

**Week 4 Deliverable — Frontend Advanced**
Case study project: `restful-api.html` (see this folder)

---

## 1. What REST APIs Are

A REST API lets your frontend talk to a server using plain HTTP requests. Each request uses a **method** that signals its intent, and targets a **URL** representing a resource (e.g. a single post, or the whole posts collection).

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a free fake REST API made for exactly this kind of practice.

---

## 2. The Four Methods

| Method | Purpose | Typical body? |
|---|---|---|
| `GET` | Retrieve a resource | No |
| `POST` | Create a new resource | Yes |
| `PUT` | Replace an existing resource entirely | Yes |
| `DELETE` | Remove a resource | No |

```js
// GET — just fetch, no options needed
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => res.json())
  .then(data => console.log(data));

// POST — send data, tell the server it's JSON
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New Post", body: "...", userId: 1 }),
});
```

**In the project:** a single `callApi(method, url, body)` helper handles all four verbs — the only thing that changes between them is the `method` and whether a `body` is sent.

---

## 3. Reading the Response

`fetch()` returns a `Promise`. The response itself has a `.status` (e.g. `200` OK, `201` Created, `404` Not Found) and a body that needs to be parsed — usually with `.json()`.

```js
const response = await fetch(url, options);
const data = await response.json();
console.log(response.status, data);
```

`async/await` is used here instead of chained `.then()` calls to keep the flow readable top-to-bottom.

---

## 4. Case Study Summary

The **CRUD Demo** has one button per HTTP method:

- **GET** → fetches post #1
- **POST** → creates a new post with a title/body/userId
- **PUT** → replaces post #1 with new content
- **DELETE** → removes post #1

Every response is shown on the page **and** logged to the console, satisfying *"Presentation of Study/Practise of learning outcome."*

Note: JSONPlaceholder doesn't actually persist changes (it fakes a success response), so POST/PUT/DELETE won't "really" change data on repeated GETs — that's expected and normal for a test API like this.

---

## 5. Resources

- [Video walkthrough](https://youtube.com/watch?v=Q-BpqyOT3a8)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) — free fake REST API for testing