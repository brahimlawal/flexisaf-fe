# React UI Components (MUI) — Learning Notes

**Week 8 Deliverable — Frontend Advanced**
Case study project: `Student Dashboard` built with [MUI](https://mui.com/) (this folder)
Live URL: _paste your deployed link here_

---

## 1. What a UI Component Library Is

Instead of writing every button, table and form field from scratch (and styling them by hand), a UI library gives you a set of ready-made, accessible, good-looking React components. MUI implements Google's Material Design, so the app looks consistent and works on both desktop and mobile out of the box.

---

## 2. Setup

MUI needs a real build setup (Vite), so unlike earlier weeks this is an npm project:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

`@emotion` is the styling engine MUI uses under the hood; `@mui/icons-material` is the icon set.

---

## 3. Components Used

| Component | What it does in the app |
|---|---|
| `AppBar` + `Toolbar` | Top navigation bar with the title and theme toggle |
| `Container` + `Grid` | Page width and a responsive 12-column layout (stat cards stack on phones) |
| `Card` + `CardContent` | The summary stat cards and the "Add a student" panel |
| `TextField` + `Button` | The add-student form |
| `Table` family | The student list |
| `Chip` | Green "Pass" / red "Fail" labels |
| `IconButton` + icons | Delete button and light/dark toggle |
| `Snackbar` + `Alert` | Small pop-up messages ("Student added", validation errors) |
| `Stack` | Lays out form fields in a row (desktop) or column (mobile) |

---

## 4. Key Ideas

**Theming.** `createTheme()` defines colours, shape and light/dark mode in one object. `ThemeProvider` hands it to every component below it, so changing `mode` re-styles the whole app at once. `CssBaseline` resets browser defaults and applies the theme background.

```jsx
const theme = createTheme({ palette: { mode, primary: { main: "#1565c0" } } });
<ThemeProvider theme={theme}><CssBaseline /> ... </ThemeProvider>
```

**The `sx` prop.** A shortcut for one-off styling that can read from the theme: `<Box sx={{ mb: 3, py: 4 }}>`.

**Responsive layout.** Props accept breakpoints: `size={{ xs: 12, sm: 4 }}` means full width on phones, one-third on larger screens.

**Props for variants.** `variant="contained"`, `color="success"`, `size="small"` change a component's look without writing CSS.

---

## 5. Case Study Summary

The **Student Dashboard** is the Week 1 grade tracker rebuilt as a real React app with MUI: summary cards (total / passed / average), a validated add-student form, a table with Pass/Fail chips, delete buttons, toast messages, and a dark-mode toggle. It reuses earlier lessons too: `useState`, `.filter()` / `.reduce()`, controlled form inputs, and event handlers.

This satisfies the deliverable: *"Integration of UI components in a React application, share URL of deployed application."*

---

## 6. Run Locally

```bash
npm install
npm run dev        # development server
npm run build      # production build into /dist
```

---

## 7. Deployment (Vercel)

1. Push the repo to GitHub.
2. Go to vercel.com → **Add New Project** → import `flexisaf-fe`.
3. Set **Root Directory** to `week-8-mui-ui` (the repo holds many weeks, so Vercel must know which folder is the app).
4. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`.
5. Click **Deploy**. Copy the `.vercel.app` URL into this file and your submission email.

---

## 8. Resources

- [MUI](https://mui.com/) — component docs and examples
