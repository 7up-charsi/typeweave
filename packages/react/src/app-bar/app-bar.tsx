import React from 'react';
import { useControlled } from '../use-controlled';
import { appBarStyles, AppBarVariantProps } from './app-bar.styles';

export interface AppBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AppBarVariantProps {
  isHidden?: boolean;
  onHiddenChange?: (isHidden: boolean) => void;
  defaultHidden?: boolean;
  hideThreshold?: number;
  showThreshold?: number;
}

const displayName = 'AppBar';

export const AppBar = React.forwardRef<HTMLDivElement, AppBarProps>(
  (props: AppBarProps, forwardedRef) => {
    const {
      children,
      isHidden: isHiddenProp,
      onHiddenChange,
      defaultHidden,
      className,
      hideThreshold = 150,
      showThreshold = 40,
      shadow = true,
      ...restProps
    } = props;

    const [isHidden, setIsHidden] = useControlled({
      controlled: isHiddenProp,
      default: defaultHidden ?? false,
      onChange: onHiddenChange,
      name: displayName,
      state: 'isHidden',
    });

    const [scroll, setScroll] = React.useState(0);

    const styles = React.useMemo(() => appBarStyles({ shadow }), [shadow]);

    React.useEffect(() => {
      let lastScrolled = window.scrollY;
      let lastScrollDirection = 0; // 1 is down and -1 is up scroll
      let scrollTraveled = 0;

      setScroll(window.scrollY);

      const handler = () => {
        const currentScroll = window.scrollY;
        const newScrollDirection = currentScroll > lastScrolled ? 1 : -1;

        if (newScrollDirection === 1 && lastScrollDirection === -1) {
          scrollTraveled = 0; // reset if scrolling up after scrolling down
        } else if (newScrollDirection === -1 && lastScrollDirection === 1) {
          scrollTraveled = 0; // reset if scrolling down after scrolling up
        }

        scrollTraveled += Math.abs(currentScroll - lastScrolled);

        if (newScrollDirection === 1 && scrollTraveled >= hideThreshold) {
          setIsHidden(true);
        } else if (
          newScrollDirection === -1 &&
          scrollTraveled >= showThreshold
        ) {
          setIsHidden(false);
        }

        lastScrollDirection = newScrollDirection;
        lastScrolled = currentScroll;

        setScroll(currentScroll);
      };

      window.addEventListener('scroll', handler);

      return () => {
        window.removeEventListener('scroll', handler);
      };
    }, [hideThreshold, setIsHidden, showThreshold]);

    return (
      <div
        {...restProps}
        className={styles.base({ className })}
        ref={forwardedRef}
        data-hide={!!isHidden}
        data-scrolled={!!scroll}
      >
        {children}
      </div>
    );
  },
);

AppBar.displayName = displayName;
