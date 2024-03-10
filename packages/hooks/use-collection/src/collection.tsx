import { createContextScope } from '@webbo-ui/context';
import { Slot } from '@webbo-ui/slot';
import { useCallback, useEffect, useRef } from 'react';

export interface ParentProps {
  children?: React.ReactNode;
}

export const createCollection = <E extends HTMLElement, ItemData = object>(
  name: string,
) => {
  // *-*-*-*-* Provider *-*-*-*-*

  const Provider_Name = `${name}.Collection.Provider`;

  interface CollectionContext {
    parentRef: React.RefObject<HTMLElement>;
    map: Map<React.RefObject<E>, { ref: React.RefObject<E> } & ItemData>;
  }

  const [CollectionProvider, useCollectionContext] =
    createContextScope<CollectionContext>(Provider_Name, {
      parentRef: { current: null },
      map: new Map(),
    });

  const Provider = (props: { children?: React.ReactNode }) => {
    const { children } = props;

    const ref = useRef<HTMLElement>(null);

    const map = useRef<CollectionContext['map']>(new Map()).current;

    return (
      <CollectionProvider parentRef={ref} map={map}>
        {children}
      </CollectionProvider>
    );
  };

  Provider.displayName = 'webbo-ui.' + Provider_Name;

  // *-*-*-*-* Parent *-*-*-*-*

  const Parent_Name = `${name}.Collection.Parent`;

  const Parent = (props: ParentProps) => {
    const { children } = props;
    const context = useCollectionContext(Parent_Name);

    return <Slot ref={context.parentRef}>{children}</Slot>;
  };

  Parent.displayName = Parent_Name;

  // *-*-*-*-* Item *-*-*-*-*

  const Item_Name = `${name}.Collection.Item`;

  const DATA_ATTR = 'data-collection-item';

  type ItemProps = ItemData & {
    children: React.ReactNode;
  };

  const Item = (props: ItemProps) => {
    const { children, ...itemData } = props;

    const context = useCollectionContext(Item_Name);

    const ref = useRef<E>(null);

    useEffect(() => {
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

  Item.displayName = 'webbo-ui.' + Item_Name;

  // *-*-*-*-* useCollection *-*-*-*-*

  const UseCollection_Name = `${name}.Collection.useCollection`;

  const useCollection = () => {
    const context = useCollectionContext(UseCollection_Name);

    const getItems = useCallback(() => {
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
