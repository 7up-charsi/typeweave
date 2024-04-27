import React from 'react';
import { createContextScope } from '../context';
import { useDisclosureCtx, useDisclosureStyles } from './disclosure-root';

export interface DisclosureItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

interface DisclosureItemCtxProps {
  value: string;
  triggerId: string;
  contentId: string;
  isExpended: boolean;
  disabled?: boolean;
}

const Comp_Name = 'DisclosureItem';

const [DisclosureItemCtx, useDisclosureItemCtx] =
  createContextScope<DisclosureItemCtxProps>(Comp_Name);

export { useDisclosureItemCtx };

export const DisclosureItem = React.forwardRef<
  HTMLDivElement,
  DisclosureItemProps
>((props, ref) => {
  const { value, className, disabled, ...restProps } = props;

  const disclosureCtx = useDisclosureCtx(Comp_Name);
  const styles = useDisclosureStyles(Comp_Name);

  const triggerId = React.useId();
  const contentId = React.useId();

  const isExpended = !!disclosureCtx.value.find((ele) => ele === value);

  return (
    <DisclosureItemCtx
      value={value}
      triggerId={triggerId}
      contentId={contentId}
      isExpended={isExpended}
      disabled={disabled}
    >
      <div
        {...restProps}
        ref={ref}
        className={styles.item({ className })}
        data-expanded={isExpended}
      />
    </DisclosureItemCtx>
  );
});

DisclosureItem.displayName = Comp_Name;
