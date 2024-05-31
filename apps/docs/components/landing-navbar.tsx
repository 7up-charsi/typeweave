import React from 'react';
import {
  Button,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Branding } from './branding';
import { navbarLinks } from '@/config/navbar-links';
import Link from 'next/link';
import { GithubLink } from './github-link';

const displayName = 'LandingNavbar';

export const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-20 m-auto flex h-16 w-full max-w-screen-2xl items-center border-b border-b-muted-6 bg-muted-1/50 px-12 backdrop-blur-sm">
      <Branding />

      <nav
        aria-label="primary navigation links"
        className="ml-10 flex gap-2 max-lg:hidden"
      >
        {navbarLinks.map(({ href, title }, i) => (
          <Button key={i} asChild variant="text">
            <Link href={href} className="first-letter:uppercase">
              {title}
            </Link>
          </Button>
        ))}
      </nav>

      <GithubLink className="ml-auto max-lg:hidden" />

      <DrawerRoot>
        <DrawerTrigger>
          <Button
            isIconOnly
            aria-label="navbar"
            className="ml-auto lg:hidden"
          >
            <MenuIcon />
          </Button>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerOverlay />

          <DrawerContent className="w-full px-4 md:w-[300px] lg:hidden">
            <div className="relative flex h-16 items-center justify-center border-b border-b-muted-6">
              <Branding />

              <DrawerClose>
                <Button
                  isIconOnly
                  aria-label="close navbar"
                  size="sm"
                  color="danger"
                  className="absolute left-0"
                >
                  <XIcon />
                </Button>
              </DrawerClose>
            </div>

            <nav
              aria-label="primary navigation links"
              className="mt-5 space-y-2"
            >
              {navbarLinks.map(({ href, title }, i) => (
                <Button
                  key={i}
                  asChild
                  className="w-full justify-start"
                  variant="text"
                >
                  <Link href={href} className="px-3 py-2">
                    {title}
                  </Link>
                </Button>
              ))}
            </nav>

            <div className="mt-5 flex justify-center border-t py-2">
              <GithubLink />
            </div>
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>
    </header>
  );
};

LandingNavbar.displayName = displayName;
