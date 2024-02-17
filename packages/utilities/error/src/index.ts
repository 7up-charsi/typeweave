export class CustomError extends Error {
  constructor(
    public component: string,
    public message: string,
  ) {
    super(message);

    this.name = `webbo-ui ${component[0].toUpperCase() + component.slice(1)}`;
  }
}
