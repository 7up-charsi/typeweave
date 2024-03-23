import React from 'react';
import { alert } from '@webbo-ui/theme';
import { Alert } from '../src';
import { Icon } from '@webbo-ui/icon';

const heart_svg = (
  <Icon>
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z" />
    </svg>
  </Icon>
);

const faceMindBlowing_svg = (
  <Icon>
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 11.5a.5.5 0 0 0-1 0 1.4 1.4 0 0 1-1.4 1 1.5 1.5 0 0 1-1.4-1 .5.5 0 0 0-1 0 1.5 1.5 0 0 1-2.7 0v-2h2.2a2.6 2.6 0 0 0 2.7-2.7 2.7 2.7 0 0 0-2.7-2.6h-.5l-.1-.3a2.6 2.6 0 0 0-3.8-1.4l-.3.1-.3-.1a2.6 2.6 0 0 0-2.8 0c-.4.4-.8.8-1 1.4V4h-.6a2.7 2.7 0 0 0-2.7 2.6 2.6 2.6 0 0 0 2.7 2.7h2.3v2a1.3 1.3 0 0 1-1.3 1 1.6 1.6 0 0 1-1.5-1 .5.5 0 0 0-1 0 1.5 1.5 0 0 1-1.4 1 1.4 1.4 0 0 1-1.4-1 .5.5 0 0 0-.5-.4.5.5 0 0 0-.5.6v.4a10 10 0 1 0 20 0v-.5ZM8.3 15.7a1 1 0 1 1 2.1 0 1 1 0 0 1-2 0Zm1.6 3.7a2.1 2.1 0 0 1 4.2 0H10Zm4.7-2.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
    </svg>
  </Icon>
);

const meta = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;

const ColorsTemplate = () => (
  <div className="flex flex-col gap-5">
    {Object.keys(alert.variants.color).map((color) => (
      <Alert key={color} color={color as never}>
        this is `{color}` variant
      </Alert>
    ))}
  </div>
);

export const Colors = {
  render: ColorsTemplate,
};

const VariantsTemplate = () => (
  <div className="flex flex-col gap-5">
    {Object.keys(alert.variants.variant).map((variant) => (
      <Alert key={variant} variant={variant as never} color="warning">
        this is `{variant}` variant
      </Alert>
    ))}
  </div>
);

export const Variants = {
  render: VariantsTemplate,
};

const TitleTemplate = () => (
  <div className="flex flex-col gap-5">
    {Object.keys(alert.variants.color).map((color) => (
      <Alert key={color} color={color as never} title={color}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam
        dolorem quisquam eaque excepturi, perferendis, numquam cumque neque unde
        quas rerum distinctio.
      </Alert>
    ))}
  </div>
);

export const Title = {
  render: TitleTemplate,
};

const ActionTemplate = () => (
  <div className="flex flex-col gap-5">
    {Object.keys(alert.variants.color).map((color) => (
      <Alert key={color} color={color as never} onClose={() => {}}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam
        dolorem quisquam eaque
      </Alert>
    ))}
  </div>
);

export const Action = {
  render: ActionTemplate,
};

const CustomIconTemplate = () => (
  <div className="flex flex-col gap-5">
    <Alert icon={heart_svg} color="success">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam
      dolorem quisquam eaque
    </Alert>
    <Alert icon={faceMindBlowing_svg} color="danger">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam
      dolorem quisquam eaque
    </Alert>
  </div>
);

export const CustomIcon = {
  render: CustomIconTemplate,
};
