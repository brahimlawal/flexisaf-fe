Opening (CDN setup, lines 18–20)
"No npm or build tools here — I loaded React, ReactDOM, and Babel straight from a CDN, so this whole app just runs by opening the HTML file in a browser."

1. Props (lines 31–39)
"This is StudentCard, a functional component. It receives name and score as props from its parent and just displays them — props are read-only, so this component never changes the data itself, only shows it."

2. Fragment (lines 43–51)
"StudentList renders multiple StudentCards using a Fragment — that's the <> </> syntax. It lets me group elements without adding an extra wrapper <div> to the actual page."

3. Class Component + Lifecycle (lines 55–79)
"This Clock is a class component, which comes with built-in lifecycle methods. componentDidMount runs once the component appears on screen — I use it to start a timer. componentWillUnmount runs right before it's removed, so I clear that timer there to avoid memory leaks."

4. State + Event Handler (line 83 onward)
"App holds the actual data — the list of students — in state using useState. That state gets passed down to the children as props. I also use useEffect, which is the functional version of a lifecycle method, running after each render."

Event Handler close
"This button's onClick is an event handler — when clicked, it updates state, and React automatically re-renders only the parts of the UI that changed. That's the Virtual DOM at work: it figures out the smallest possible update instead of redrawing the whole page."
