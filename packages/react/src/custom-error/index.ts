export class CustomError extends Error {
  constructor(
    public component: string,
    public message: string,
  ) {
    super(message);

    this.name = `webbo-ui ${component[0].toUpperCase() + component.slice(1)}`;
  }
}

export const accessibilityWarning = (component: string, message: string) => {
  console.warn(
    `%cwebbo-ui.${component}%c${message}`,
    'font-weight:bold; margin: 5px; color: #ffdf00;',
    'font-weight:normal; margin-right:0px;',
  );
};
