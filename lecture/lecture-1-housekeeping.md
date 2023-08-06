---
marp: true
---

# React Effects

---

### Housekeeping: Rules of Hooks

We saw `useState`, which is a React hook.

Hooks have certain rules.

---

### 1. Must be called from a React component

Cannot call hooks from anywhere

```js
// 🙅‍♀️ Not in a component :
const [data, setData] = useState(null);

const App = () => {
  return <div>{data.name}</div>;
};
```

---

### 1. Must be called from a React component

Cannot call hooks from anywhere\*

```js
// 🙅‍♀️ in a function, not a component:
const getData = () => {
  const [data, setData] = useState(null);

  return data;
};

const App = () => {
  const data = getData();
  return <div>{data.name}</div>;
};
```

\*we will see a way to do this, kinda, in the future. For now though, hooks should always be right there in the component.

---

### 2. Cannot be conditional

React hooks should always be at the top level inside your function.

```js
const App = ({ showErrors }) => {
  let error;

  // 🙅‍♀️ in a condition:
  if (showErrors) {
    error = useState(null);
  }

  return "hi";
};
```

---

# Exercises

Fix the following state hooks

---

```js
const Button = ({ type, children }) => {
  if (type === "primary") {
    const [color, setColor] = useState("red");

    return (
      <button
        style={{ color }}
        onMouseEnter={() => {
          setColor("purple");
        }}
        onMouseLeave={() => {
          setColor("red");
        }}
      >
        {children}
      </button>
    );
  } else {
    return <button style={{ backgroundColor: "purple" }}>{children}</button>;
  }
};
```
