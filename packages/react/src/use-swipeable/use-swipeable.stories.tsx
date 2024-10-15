import React from 'react';
import { useSwipeable } from './index';

const meta = {
  title: 'Hooks/use-swipeable',
};

export default meta;

const Template = () => {
  const handlers = useSwipeable({
    minDistance: 100,
    swipeDuration: 2000,
    onSwipe: () => console.log('onSwipe'),
    onSwipeDown: () => console.log('onSwipeDown'),
    onSwipeLeft: () => console.log('onSwipeLeft'),
    onSwipeRight: () => console.log('onSwipeRight'),
    onSwipeStart: () => console.log('onSwipeStart'),
    onSwipeUp: () => console.log('onSwipeUp'),
    onSwiping: () => console.log('onSwiping'),
  });

  React.useEffect(() => {
    document.addEventListener('pointerdown', handlers.onMouseDown);
    document.addEventListener('pointermove', handlers.onMouseMove);
    document.addEventListener('pointerup', handlers.onMouseUp);

    return () => {
      document.removeEventListener('pointerdown', handlers.onMouseDown);
      document.removeEventListener('pointermove', handlers.onMouseMove);
      document.removeEventListener('pointerup', handlers.onMouseUp);
    };
  }, []);

  return <div>sipewable</div>;
};

export const Default = {
  render: Template,
};
