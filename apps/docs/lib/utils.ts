export const createRequire =
  (imports: Record<string, unknown>) => (module: string) => {
    if (!imports.hasOwnProperty(module)) {
      throw new Error(`Module not found: '${module}'`);
    }

    return imports[module];
  };
