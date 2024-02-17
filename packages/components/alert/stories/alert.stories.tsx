import React, { Fragment } from 'react';
import { alert } from '@webbo-ui/theme';
import { Alert } from '../src';

const meta = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;

const Template = () => (
  <>
    {Object.keys(alert.variants.variant).map((variant) => (
      <div key={variant} className="flex flex-col gap-4 first:mt-0 mt-4">
        <span className="text-foreground pl-3 uppercase font-bold place-self-start text-sm border-l-2 border-neutral9">
          {variant}
        </span>

        {Object.keys(alert.variants.color).map((color) => (
          <Fragment key={color + variant}>
            <Alert variant={variant as never} color={color as never}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim ab
              fugiat commodi
            </Alert>
          </Fragment>
        ))}
      </div>
    ))}
  </>
);

export const Default = {
  render: Template,
};
