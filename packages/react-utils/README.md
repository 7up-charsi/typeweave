# Typeweave

## Introduction

**TypeWeave** is an organization on npm that provides a collection of packages for building robust and elegant user interfaces. My goal is to streamline the development process and make it easier for developers to create high-quality applications.

For the most comprehensive information and instructions, please refer to the [Main README](https://github.com/7up-charsi/typeweave?tab=readme-ov-file) of this project.

## Main Packages

- **@typeweave/react**: refer to the [Main README](https://github.com/7up-charsi/typeweave?tab=readme-ov-file)
- **@typeweave/theme**: refer to the [Main README](https://github.com/7up-charsi/typeweave?tab=readme-ov-file)

## @typeweave/react-utils

The **_@typeweave/react-utils_** package contains utility functions for **_@typeweave/react_**. This package includes a collection of utility functions used by **_@typeweave/react_**. These utilities are designed to be lightweight and flexible, making it easier to integrate and work with React applications.

---

## mergeProps

### Description

Merges multiple props objects into a single object, handling edge cases for event handlers, classNames, and styles.

### Syntax

```ts
mergeProps(...props: object[]): Record<string, unknown>
```

### Parameters

props: A variable number of objects to be merged.

### Return Value

A single object containing the merged props.

### Details

- If two or more props objects have the same key, the value from the last props object will be used, unless:
  - The key starts with "on" and the value is a function (event handler), in which case the functions will be chained.
  - The key is "className" and the values are strings, in which case the values will be merged using the clsx function.
  - The key is "style" and the values are objects, in which case the objects will be merged

### example

```jsx
export default function App() {
  const props1 = { onClick: () => console.log('Hello'), className: 'foo' };

  const props2 = { onClick: () => console.log('World'), className: 'bar' };

  return <div {...mergeProps(props1, props2)}></div>;
}
```

---

## mergeRefs

### Description

Merges multiple refs into a single ref callback function, handling various types of refs and edge cases.

### Syntax

```ts
mergeRefs<T>(...refs: (React.ForwardedRef<T> | React.RefObject<T> | React.Dispatch<React.SetStateAction<T>> | undefined | null)[]): React.RefCallback<T>
```

### Parameters

refs: A variable number of refs to be merged, which can be:

- React.ForwardedRef<T>: A forwarded ref from a React component.
- React.RefObject<T>: A ref object.
- React.Dispatch<React.SetStateAction<T>>: A state update function.
- undefined: Undefined values are ignored.
- null: Null values are ignored.

### Return Value

A single ref callback function that handles the merged refs.

### Details

- The function filters out undefined and null values from the input refs array.
- For each remaining ref, it checks the type:
  - If the ref is a function, it calls the function with the node as an argument.
  - If the ref is an object (e.g., a ref object), it sets the current property to the node.

### Example

```jsx
export default function App() {
  const ref1 = React.createRef();
  const ref2 = React.createRef();

  return <div ref={mergeRefs(ref1, ref2)}></div>;
}
```
