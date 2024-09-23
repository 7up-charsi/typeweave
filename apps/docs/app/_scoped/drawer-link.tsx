'use client';

import { useRouter } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface DrawerLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  handleClose?: () => void;
}

const displayName = 'DrawerLink';

export const DrawerLink = React.forwardRef<
  HTMLAnchorElement,
  DrawerLinkProps
>((props, forwardedRef) => {
  const { href, handleClose, ...restProps } = props;

  const router = useRouter();

  const isCTRLRef = React.useRef(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
        isCTRLRef.current = true;
      } else {
        isCTRLRef.current = false;
      }
    };

    const onKeyUp = () => {
      isCTRLRef.current = false;
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <Link
      ref={forwardedRef}
      href={href}
      {...restProps}
      // TODO: Replace this with `onPress` once `useRouteProgress` is upgraded to `PointerEvents`
      onClick={(e) => {
        if (isCTRLRef.current) return;
        if (!href) return;

        e.preventDefault();

        handleClose?.();
        router.push(href);
      }}
    />
  );
});

DrawerLink.displayName = displayName;
