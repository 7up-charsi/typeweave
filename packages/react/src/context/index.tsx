'use client';

import React from 'react';

const displayName = 'createContextScope';

export const createContextScope = <ContextValue extends object>(
  rootName: string,
  defaultContext?: ContextValue,
) => {
  const Context = React.createContext(defaultContext);

  const Provider = (props: ContextValue & { children?: React.ReactNode }) => {
    const { children, ...context } = props;

    const value = React.useMemo(
      () => context,
      Object.values(context),
    ) as ContextValue;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = (consumerName: string) => {
    const context = React.useContext(Context);

    if (!context)
      throw new Error(
        `${displayName}, \`${consumerName}\` must be used within \`${rootName}\``,
      );

    return context;
  };

  Provider.displayName = `${rootName}Provider`;

  return [Provider, useContext] as const;
};
