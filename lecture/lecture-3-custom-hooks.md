---

marp: true

---

# Custom hooks

React hooks are powerful because we can _compose them_.

---

A custom hook is a **function** that starts with **use**.

Examples:

- _useApiEndpoint_
- _useTextToSpeech_
- _useScrollPosition_
- _useCounter_

React tooling actually **does** care that the name starts with `use`.

---

Custom hooks use **one or more** official React hooks.

They're a great way to **reuse logic**.

---

### Example

Tracking mouse position

```js
const App = () => {
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  });

  useEffect(() => {
    const handleMousemove = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", handleMousemove);

    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  return (
    <div>
      The mouse is at {mousePosition.x}, {mousePosition.y}.
    </div>
  );
};
```

---


```js
// refactoring time...
```

---

# Exercise

Extract a custom hook

---

```js live=true
const Time = ({ throttleDuration }) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, throttleDuration);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [throttleDuration]);

  return (
    <span>
      It is currently
      <br />
      {time.toTimeString()}
    </span>
  );
};

render(<Time throttleDuration={1000} />);
```
