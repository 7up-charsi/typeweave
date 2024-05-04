export type StackItem = { paused: boolean; pause(): void; resume(): void };

export const createStackManager = () => {
  let stack: StackItem[] = [];

  const add = (toAdd: StackItem) => {
    const exists = stack.find((item) => item === toAdd);

    if (exists) return;

    // pause last one before added new
    stack.at(-1)?.pause();

    stack.push(toAdd);
  };

  const remove = (toRemove: StackItem) => {
    stack = stack.filter((item) => item !== toRemove);

    // resume last one after removed (does not matter which one removed)
    stack.at(-1)?.resume();
  };

  return { add, remove };
};
