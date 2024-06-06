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
import { navbarLinks } from '@/config/navbar-links';
import Link from 'next/link';
import { Branding } from '@/components/branding';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { GithubLink } from '@/components/github-link';

const displayName = 'Navbar';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 m-auto flex h-16 w-full max-w-screen-2xl items-center border-b border-b-muted-6 bg-muted-1/50 px-5 backdrop-blur-sm lg:px-10">
      <DrawerRoot>
        <DrawerTrigger>
          <Button
            isIconOnly
            aria-label="navbar"
            className="mr-5 lg:hidden"
          >
            <MenuIcon />
          </Button>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerOverlay />

          <DrawerContent className="w-full max-w-[300px]">
            <div className="relative flex h-16 items-center justify-center px-5">
              <Branding />

              <DrawerClose>
                <Button
                  isIconOnly
                  aria-label="close navbar"
                  size="sm"
                  color="danger"
                  className="absolute right-5"
                >
                  <XIcon />
                </Button>
              </DrawerClose>
            </div>

            <nav
              aria-label="primary navigation links"
              className="space-y-2 px-5"
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
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>

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

      <div className="grow"></div>

      <ThemeSwitcher className="mr-5" />
      <GithubLink />
    </header>
  );
};

Navbar.displayName = displayName;
