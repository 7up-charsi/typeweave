import React from 'react';
import { useDisclosureItemCtx } from './disclosure-item';
import { useDisclosureStyles } from './disclosure-root';

export interface DisclosureContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Comp_Name = 'DisclosureContent';

export const DisclosureContent = React.forwardRef<
  HTMLDivElement,
  DisclosureContentProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const disclosureItemCtx = useDisclosureItemCtx(Comp_Name);
  const styles = useDisclosureStyles(Comp_Name);

  return !disclosureItemCtx.isExpended ? null : (
    <div
      {...restProps}
      ref={ref}
      id={disclosureItemCtx.contentId}
      hidden={!disclosureItemCtx.isExpended}
      className={styles.content({ className })}
    />
  );
});

DisclosureContent.displayName = 'DisclosureContent';
