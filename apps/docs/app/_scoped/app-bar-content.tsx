import { ThemeSwitcher } from '@/components/theme-switcher';
import { GithubLink } from '@/components/github-link';
import { Branding } from '@/components/branding';
import { NavDrawer } from './nav-drawer';
import React from 'react';

const displayName = 'AppBarContent';

export const AppBarContent = () => {
  return (
    <header className="flex h-16 items-center px-5 lg:px-10">
      <Branding />

      <div className="grow"></div>

      <div className="hidden md:block">
        <ThemeSwitcher />
      </div>

      <div className="mr-3 hidden md:block">
        <GithubLink />
      </div>

      <NavDrawer />
    </header>
  );
};

AppBarContent.displayName = displayName;
