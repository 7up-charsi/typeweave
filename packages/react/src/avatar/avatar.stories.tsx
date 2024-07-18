import React from 'react';
import { AvatarFallback } from './avatar-fallback';
import { AvatarImage } from './avatar-image';
import { AvatarRoot } from './avatar-root';

const meta = {
  title: 'Components/Avatar',
};

export default meta;

const DefaultTemplate = () => (
  <AvatarRoot>
    <AvatarImage src="https://images.unsplsh.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" />
    <AvatarFallback>G</AvatarFallback>
  </AvatarRoot>
);

export const Default = {
  render: DefaultTemplate,
};
