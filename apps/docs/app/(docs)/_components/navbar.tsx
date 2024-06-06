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
import { Branding } from '@/components/branding';
import { SidebarContent } from './sidebar-content';
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
            className="mr-5 xl:hidden"
          >
            <MenuIcon />
          </Button>
        </DrawerTrigger>

        <DrawerPortal>
          <DrawerOverlay />

          <DrawerContent className="w-full max-w-[300px]">
            <div className="flex h-full flex-col">
              <div className="relative flex h-16 shrink-0 items-center justify-center px-5">
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

              <div className="grow overflow-auto px-5 pb-4">
                <SidebarContent />
              </div>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </DrawerRoot>

      <Branding />

      <div className="grow"></div>

      <ThemeSwitcher className="mr-5" />
      <GithubLink />
    </header>
  );
};

Navbar.displayName = displayName;
