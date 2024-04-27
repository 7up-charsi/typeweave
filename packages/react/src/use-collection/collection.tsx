import { createContextScope } from '../context';
import { Slot } from '../slot';
import React from 'react';

export interface ParentProps {
  children?: React.ReactNode;
}

export const createCollection = <E extends HTMLElement, ItemData = object>(
  name: string,
) => {
  // *-*-*-*-* Provider *-*-*-*-*

  const ProviderDisplayName = `${name}.Collection.Provider`;

  interface CollectionContext {
    parentRef: React.RefObject<HTMLElement>;
    map: Map<React.RefObject<E>, { ref: React.RefObject<E> } & ItemData>;
  }

  const [CollectionProvider, useCollectionContext] =
    createContextScope<CollectionContext>(ProviderDisplayName, {
      parentRef: { current: null },
      map: new Map(),
    });

  const Provider = (props: { children?: React.ReactNode }) => {
    const { children } = props;

    const ref = React.useRef<HTMLElement>(null);

    const map = React.useRef<CollectionContext['map']>(new Map()).current;

    return (
      <CollectionProvider parentRef={ref} map={map}>
        {children}
      </CollectionProvider>
    );
  };

  Provider.displayName = ProviderDisplayName;

  // *-*-*-*-* Parent *-*-*-*-*

  const ParentDisplayName = `${name}.Collection.Parent`;

  const Parent = (props: ParentProps) => {
    const { children } = props;
    const context = useCollectionContext(ParentDisplayName);

    return <Slot ref={context.parentRef}>{children}</Slot>;
  };

  Parent.displayName = ParentDisplayName;

  // *-*-*-*-* Item *-*-*-*-*

  const ItemDisplayName = `${name}.Collection.Item`;

  const DATA_ATTR = 'data-collection-item';

  type ItemProps = ItemData & {
    children: React.ReactNode;
  };

  const Item = (props: ItemProps) => {
    const { children, ...itemData } = props;

    const context = useCollectionContext(ItemDisplayName);

    const ref = React.useRef<E>(null);

    React.useEffect(() => {
      context.map.set(ref, {
        ref,
        ...(itemData as unknown as ItemData),
      });
      return () => void context.map.delete(ref);
    });

    return (
      <Slot {...{ [DATA_ATTR]: 'true' }} ref={ref}>
        {children}
      </Slot>
    );
  };

  Item.displayName = ItemDisplayName;

  // *-*-*-*-* useCollection *-*-*-*-*

  const UseCollection_Name = `${name}.Collection.useCollection`;

  const useCollection = () => {
    const context = useCollectionContext(UseCollection_Name);

    const getItems = React.useCallback(() => {
      const parent = context.parentRef.current;

      if (!parent) return [];

      const orderedNodes = Array.from(
        parent.querySelectorAll(`[${DATA_ATTR}]`),
      );

      const items = Array.from(context.map.values());

      const orderedItems = items.sort(
        (a, b) =>
          orderedNodes.indexOf(a.ref.current!) -
          orderedNodes.indexOf(b.ref.current!),
      );

      return orderedItems;
    }, [context.map, context.parentRef]);

    return getItems;
  };

  return [
    {
      Provider,
      Parent,
      Item,
    },
    useCollection,
  ] as const;
};
