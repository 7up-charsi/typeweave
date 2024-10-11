'use client';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from '@typeweave/react/dialog';
import { createDialogState } from '@typeweave/react-utils/dialog-state';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { GithubLink } from '@/components/github-link';
import { SidebarContent } from './sidebar-content';
import { Button } from '@typeweave/react/button';
import { Branding } from '@/components/branding';
import { MenuIcon, XIcon } from 'lucide-react';
import React from 'react';

const displayName = 'NavDrawer';

export const useNavDrawerState = createDialogState();

export const NavDrawer = () => {
  const { handleClose, handleOpenChange, open } = useNavDrawerState();

  return (
    <DialogRoot
      open={open}
      onClose={handleClose}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger>
        <Button
          variant="text"
          isIconOnly
          aria-label="open navigation drawer"
          className="text-2xl md:hidden"
        >
          <MenuIcon />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />

        <DialogContent
          placement="left"
          className="flex w-full max-w-[300px] flex-col"
        >
          <div className="flex h-16 shrink-0 items-center px-5">
            <Branding />

            <div className="grow"></div>

            <DialogClose>
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
            </DialogClose>
          </div>

          <hr className="mx-5 border-muted-6 md:hidden" />

          <div className="my-4 flex items-center justify-between px-5 md:hidden">
            <GithubLink />
            <ThemeSwitcher />
          </div>

          <div className="grow overflow-auto scrollbar-thin">
            <SidebarContent />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};

NavDrawer.displayName = displayName;
