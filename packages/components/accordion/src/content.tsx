import React from 'react';
import { useItemContext } from './item';
import { useStylesContext } from './root';

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Comp_Name = 'AccordionContent';

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const itemContext = useItemContext(Comp_Name);
  const styles = useStylesContext(Comp_Name);

  return !itemContext.isExpended ? null : (
    <div
      {...restProps}
      ref={ref}
      id={itemContext.contentId}
      className={styles.content({ className })}
    />
  );
});

AccordionContent.displayName = 'AccordionContent';
