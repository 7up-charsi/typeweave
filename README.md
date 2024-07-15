# Typeweave

Developed to empower developers and contribute to the developer community.

## Introduction

**Typeweave** is a specialized React TypeScript UI library designed to empower developers in crafting accessible and visually consistent web applications. It offers a robust suite of reusable components through its main packages:

**@typeweave/react**: This package provides a rich collection of components optimized for accessibility and compatibility with light and dark mode environments. Each component is meticulously engineered to ensure usability and seamless integration into diverse web projects.

**@typeweave/plugin**: As a Tailwind CSS plugin, this package extends Typeweave's functionality by injecting essential theme variables. This integration simplifies customization and theming processes, enabling developers to maintain design consistency effortlessly.

Typeweave prioritizes accessibility and design consistency while focusing on enhancing development workflows. It serves as a reliable toolkit for developers striving to deliver inclusive and visually appealing user interfaces in their React TypeScript applications.

## Features

- **TypeScript Integration**: Harness the power of TypeScript's static typing to catch errors early and enhance code maintainability.

- **Rich Component Library**: Access a comprehensive collection of UI components, ranging from basic to complex elements, all meticulously crafted for seamless integration.

- **Customization Options**: Tailor the appearance and behavior of components to suit your project's unique requirements with customizable props and styling options.

- **Developer-Friendly**: Enjoy a smooth development experience with clear documentation, helpful examples, and intuitive APIs.

- **Tailwind CSS Integration**: Built with Tailwind CSS, allowing for rapid prototyping and easy customization of component styles.

## Installation

To install **@typeweave/react** in your project, simply run one of these:

```bash
pnpm add @typeweave/react @typeweave/plugin
```

```bash
npm install @typeweave/react @typeweave/plugin
```

```bash
yarn add @typeweave/react @typeweave/plugin
```

## Usage

1. Configure **@typeweave/plugin** in `tailwind.config.js`:

```js
import { typeweave } from '@typeweave/plugin';

export default {
  content: ['./node_modules/@typeweave/react/dist/**/button.styles.js'],
  plugins: [typeweave()],
};
```

and in your **globals.css**

```css
@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

This configuration registers the styles of **Button** component and sets body background and text color.

2. Import components from **@typeweave/react**

```jsx
import React from 'react';
import "./globals.css'
import { Button } from '@typeweave/react';

const App = () => {
  return (
    <div>
      <Button onPress={() => alert('Hello, TypeWeave!')}>Press me</Button>
    </div>
  );
};

export default App;
```

## Documentation and Examples

- TypeWeave Documentation (coming soon!)
- Example Projects (coming soon!)

## Contributing

I welcome contributions to **Typeweave**. Please see Contributing Guide for information on issue reporting, pull requests, and coding standards.

## License

**Typeweave** is licensed under the **MIT License**.

## Contact

For questions, feedback, or support, please contact me at 7up.charsi@gmail.com.

## Note

This project is under active development. Your feedback is highly valued as I continue to refine and enhance **Typeweave**. Developed with the aim to demonstrate expertise.
