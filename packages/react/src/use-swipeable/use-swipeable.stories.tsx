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
    document.addEventListener('pointerdown', handlers.onPointerDown);
    document.addEventListener('pointermove', handlers.onPointerMove);
    document.addEventListener('pointerup', handlers.onPointerUp);

    return () => {
      document.removeEventListener('pointerdown', handlers.onPointerDown);
      document.removeEventListener('pointermove', handlers.onPointerMove);
      document.removeEventListener('pointerup', handlers.onPointerUp);
    };
  }, []);

  return <div>sipewable</div>;
};

export const Default = {
  render: Template,
};
