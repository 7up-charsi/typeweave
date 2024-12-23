import React from 'react';
import { Slot } from '../slot';
import { useDisclosureCtx, useDisclosureStyles } from './disclosure-root';
import { useDisclosureItemCtx } from './disclosure-item';

export interface DisclosureTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const displayName = 'DisclosureTrigger';

export const DisclosureTrigger = React.forwardRef<
  HTMLButtonElement,
  DisclosureTriggerProps
>((props, ref) => {
  const { className, disabled, ...restProps } = props;

  const disclosureCtx = useDisclosureCtx(displayName);
  const disclosureItemCtx = useDisclosureItemCtx(displayName);
  const styles = useDisclosureStyles(displayName);

  const isExpended = disclosureItemCtx.isExpended;

  const onClick = () => {
    if (isExpended) disclosureCtx.onCollapse(disclosureItemCtx.value);
    else disclosureCtx.onExpand(disclosureItemCtx.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disclosureCtx.disabled) return;

    const key = e.key;

    if ([' ', 'Enter'].includes(key)) {
      onClick();

      return;
    }
  };

  return (
    <Slot
      {...restProps}
      ref={ref}
      onKeyDown={onKeyDown}
      className={styles.trigger({ className })}
      disabled={
        disclosureCtx.disabled ?? disabled ?? disclosureItemCtx.disabled
      }
      id={disclosureItemCtx.triggerId}
      aria-expanded={isExpended}
      aria-controls={disclosureItemCtx.contentId}
      data-expanded={isExpended}
      onClick={onClick}
    />
  );
});

DisclosureTrigger.displayName = displayName;
