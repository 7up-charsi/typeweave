import React from 'react';
import { skeleton } from '@typeweave/theme';
import { Skeleton } from '../src';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: skeleton.defaultVariants,
};

export default meta;

const Template = (args) => (
  <div className="w-[300px] shadow-md border rounded p-3">
    <div className="w-full flex gap-3 items-center">
      <div>
        <Skeleton
          animation={args.animation}
          variant="circular"
          className="h-12 w-12"
        />
      </div>
      <div className="grow flex flex-col gap-1">
        <Skeleton animation={args.animation} variant="text" />
        <Skeleton
          animation={args.animation}
          variant="text"
          className="text-xs"
        />
      </div>
    </div>

    <Skeleton
      animation={args.animation}
      variant="rounded"
      className="h-24 my-4"
    />

    <div className="flex flex-col gap-1">
      <Skeleton animation={args.animation} variant="text" />
      <Skeleton animation={args.animation} variant="text" />
      <Skeleton animation={args.animation} variant="text" />
      <Skeleton animation={args.animation} variant="text" />
    </div>

    <div className="flex gap-2 mt-2">
      <Skeleton
        animation={args.animation}
        variant="rectangular"
        className="w-10 h-10"
      />
      <span className="grow" />
      <Skeleton
        animation={args.animation}
        variant="rectangular"
        className="w-10 h-10"
      />
      <Skeleton
        animation={args.animation}
        variant="rectangular"
        className="w-10 h-10"
      />
    </div>
  </div>
);

const DefaultTemplate = () => (
  <div className="flex gap-10">
    <Template />
    <Template animation="wave" />
  </div>
);

export const Default = {
  render: DefaultTemplate,
};
