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
    document.addEventListener('mousedown', handlers.onMouseDown);
    document.addEventListener('mousemove', handlers.onMouseMove);
    document.addEventListener('mouseup', handlers.onMouseUp);

    return () => {
      document.removeEventListener('mousedown', handlers.onMouseDown);
      document.removeEventListener('mousemove', handlers.onMouseMove);
      document.removeEventListener('mouseup', handlers.onMouseUp);
    };
  }, []);

  return <div>sipewable</div>;
};

export const Default = {
  render: Template,
};
