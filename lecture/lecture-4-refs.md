---
marp: true
---

# Refs

---

Let's say you want to focus an input when the component mounts.

---

One way to do this:

```js live=true
const Form = () => {
  React.useEffect(() => {
    const firstNameInput = document.getElementById("first-name");

    firstNameInput.focus();
  }, []);

  return (
    <>
      <label>
        First Name
        <input id="first-name" />
      </label>
      <br />
      <label>
        Last Name
        <input id="last-name" />
      </label>
    </>
  );
};

render(<Form />);
```

---

This works, but it's not ideal

- Requires globally-unique IDs
- Has to re-look-up the item on every render
- Only available _after_ render _(useEffect fires after the update)_

---

React offers another way: `useRef`

---

```js live=true
const Form = () => {
  const firstNameRef = React.useRef(null);

  React.useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  return (
    <>
      <label>
        First Name
        <input ref={firstNameRef} />
      </label>
      <br />
      <label>
        Last Name
        <input />
      </label>
    </>
  );
};

render(<Form />);
```

What are some things you notice about this code?

---

- `ref` attribute on React elements is a _special attribute_, like `key`
- `useRef` returns an object: `{ current: <input />}`
- You can specify an initial value for the ref, in this case `null`

---

`useRef` is _not just for DOM nodes_. It's a box you can put stuff in, to share _across_ renders.

(But usually you use it for DOM nodes.)

---

# Exercises

Use `useRef`

---

```js
const ConfirmButton = () => {
  useEffect(() => {
    const btn = document.getElementById("confirm-button");

    if (btn) {
      btn.focus();
    }
  }, []);

  return <button id="confirm-button">Confirm</button>;
};
```

---

<Timer initialTime={2} />

```js
const PasswordInput = ({ focusOnMount }) => {
  useEffect(() => {
    const input = document.getElementById("pswrd");

    if (focusOnMount && input) {
      input.focus();
    }
  }, []);

  return (
    <label>
      Password:
      <br />
      <input type="password" id="pswrd" />
    </label>
  );
};
```

---

### Bonus Exercise

Create a custom hook, `useFocusOnMount`

```js
const useFocusOnMount = () => {
  // SOLVE ME
};

const ConfirmButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return <button ref={buttonRef}>Confirm</button>;
};
```

---

### Common Gotcha

```js live=true
const Item = ({ content }) => {
    return <li>{content}</li>;
};

const App = () => {
    const ref = React.useRef(null);

    return (
        <ul>
        <Item ref={ref} content={"One"} />
        <Item content={"Two"} />
        <Item content={"Three"} />
        </ul>
    );
};

render(<App />);
```

Check the console for the issue

---

> "Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"

refs only make sense for native HTML elements (`<button>`) and styled-components (`<Button>`).

`forwardRef` is an advanced API that can bend this rule.
