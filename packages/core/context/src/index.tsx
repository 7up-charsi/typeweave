import { createContext, useContext as _useContext, useMemo } from 'react';
import { CustomError } from '@webbo-ui/error';

export const createContextScope = <ContextValue extends object>(
  rootName: string,
  defaultContext?: ContextValue,
) => {
  const Context = createContext(defaultContext);

  const Provider = (props: ContextValue & { children?: React.ReactNode }) => {
    const { children, ...context } = props;

    const value = useMemo(
      () => context,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(context),
    ) as ContextValue;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = (consumerName: string) => {
    const context = _useContext(Context);

    if (!context)
      throw new CustomError(
        'createContextScope',
        `\`${consumerName}\` must be used within \`${rootName}\``,
      );

    return context;
  };

  Provider.displayName = `${rootName}Provider`;

  return [Provider, useContext] as const;
};
