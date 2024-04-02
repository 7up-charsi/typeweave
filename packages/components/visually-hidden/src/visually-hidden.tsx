import { Slot } from '@webbo-ui/slot';

export interface VisuallyHiddenProps {
  children?: React.ReactNode;
}

const VisuallyHidden = (props: VisuallyHiddenProps) => {
  const { children } = props;

  return (
    <Slot
      tabIndex={-1}
      style={{
        position: 'absolute',
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
      }}
    >
      {children}
    </Slot>
  );
};

VisuallyHidden.displayName = 'webbo-ui.VisuallyHidden';

export default VisuallyHidden;
