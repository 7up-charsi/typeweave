import React from 'react';
import { Button } from '../button';
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from './';

const meta = {
  title: 'components/Drawer',
};

export default meta;

const Template = ({ children, placement }) => {
  return (
    <DrawerRoot keepMounted>
      <DrawerTrigger>{children}</DrawerTrigger>

      <DrawerPortal>
        <DrawerOverlay />

        <DrawerContent placement={placement}>
          <ul className="flex flex-col gap-3 items-start p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Button key={i}>button {i}</Button>
            ))}

            <DrawerRoot>
              <DrawerTrigger>
                <Button>open nested</Button>
              </DrawerTrigger>

              <DrawerPortal>
                <DrawerOverlay />

                <DrawerContent>
                  <ul className="flex flex-col gap-3 items-start p-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Button key={i}>nested {i}</Button>
                    ))}
                  </ul>
                </DrawerContent>
              </DrawerPortal>
            </DrawerRoot>
          </ul>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

const DefaultTemplate = () => {
  return (
    <div className="flex gap-3">
      <Template placement="left">
        <Button>left</Button>
      </Template>
      <Template placement="right">
        <Button>right</Button>
      </Template>
      <Template placement="bottom">
        <Button>bottom</Button>
      </Template>
      <Template placement="top">
        <Button>top</Button>
      </Template>
    </div>
  );
};

export const Default = {
  render: DefaultTemplate,
};
