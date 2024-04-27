import React from 'react';
import {
  MenuArrow,
  MenuCheckboxItem,
  MenuCheckboxItemProps,
  MenuContent,
  MenuContentProps,
  MenuPortal,
  MenuRoot,
  MenuTrigger,
} from '../menu';
import { useTableCtx } from './table-root';

export interface TableColumnVisibilityProps
  extends Omit<MenuContentProps, 'onChange'> {
  children?: React.ReactNode;
  tableIdentifier?: string;
  onChange?: (identifier: string, visibility: boolean) => void;
  classNames?: {
    menu?: string;
    checkboxItem?: MenuCheckboxItemProps['classNames'];
  };
}

const displayName = 'TableColumnVisibility';

export const TableColumnVisibility = (props: TableColumnVisibilityProps) => {
  const {
    children,
    classNames,
    className,
    onChange,
    tableIdentifier,
    ...menuProps
  } = props;

  const { columns, data, setVisibilityState, visibilityState } =
    useTableCtx(displayName);

  React.useEffect(() => {
    if (tableIdentifier) {
      setVisibilityState(
        JSON.parse(localStorage.getItem(tableIdentifier) ?? `{}`),
        null,
      );
    }
  }, [setVisibilityState, tableIdentifier]);

  return (
    <MenuRoot>
      <MenuTrigger aria-label="open table column visibility">
        {children}
      </MenuTrigger>
      <MenuPortal>
        <MenuContent
          aria-roledescription="toggle table column visibility"
          {...menuProps}
          className={classNames?.menu ?? className}
        >
          <MenuArrow />

          {columns &&
            data &&
            columns.map((column, i) => {
              const {
                header,
                visibilityTitle,
                visibility,
                hideable,
                identifier,
              } = column;

              if (!hideable) return;

              const headerValue = header(data);

              const val =
                typeof headerValue === 'string' ? headerValue : visibilityTitle;

              const checked = visibilityState?.[identifier] ?? visibility;

              return (
                <MenuCheckboxItem
                  key={i}
                  checked={checked}
                  classNames={classNames?.checkboxItem}
                  onChange={(checked) => {
                    if (onChange) onChange(identifier, checked);
                    if (!onChange && tableIdentifier) {
                      localStorage.setItem(
                        tableIdentifier,
                        JSON.stringify({
                          ...visibilityState,
                          [identifier]: checked,
                        }),
                      );
                    }

                    setVisibilityState(
                      (prev) => ({ ...prev, [identifier]: checked }),
                      identifier,
                    );
                  }}
                >
                  {val ? val[0].toUpperCase() + val.slice(1) : ''}
                </MenuCheckboxItem>
              );
            })}
        </MenuContent>
      </MenuPortal>
    </MenuRoot>
  );
};

TableColumnVisibility.displayName = displayName;
