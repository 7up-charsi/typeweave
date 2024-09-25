'use client';

import {
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react/drawer';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { createDialogState } from '@typeweave/react-utils';
import { GithubLink } from '@/components/github-link';
import { SidebarContent } from './sidebar-content';
import { Button } from '@typeweave/react/button';
import { Branding } from '@/components/branding';
import { MenuIcon, XIcon } from 'lucide-react';
import React from 'react';

interface NavDrawerProps {}

const displayName = 'NavDrawer';

export const useNavDrawerState = createDialogState();

export const NavDrawer = (props: NavDrawerProps) => {
  const {} = props;

  const { handleClose, handleOpenChange, open } = useNavDrawerState();

  return (
    <DrawerRoot
      open={open}
      onClose={handleClose}
      onOpenChange={handleOpenChange}
    >
      <DrawerTrigger>
        <Button
          variant="text"
          isIconOnly
          aria-label="open navigation drawer"
          className="text-2xl md:hidden"
        >
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay />

        <DrawerContent className="flex w-full max-w-[300px] flex-col">
          <div className="flex h-16 shrink-0 items-center px-5">
            <Branding />

            <div className="grow"></div>

            <DrawerClose>
              <Button
                variant="text"
                isIconOnly
                aria-label="close navigation drawer"
                size="sm"
                color="danger"
                className="text-xl"
              >
                <XIcon />
              </Button>
            </DrawerClose>
          </div>

          <hr className="mx-5 border-muted-6 md:hidden" />

          <div className="my-4 flex items-center justify-between px-5 md:hidden">
            <GithubLink />
            <ThemeSwitcher />
          </div>

          <div className="grow overflow-auto scrollbar-thin">
            <SidebarContent />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

NavDrawer.displayName = displayName;
