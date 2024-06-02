'use client';

import React from 'react';

interface ClientDemoRendererProps {
  children?: React.ReactNode;
}

const displayName = 'ClientDemoRenderer';

export const ClientDemoRenderer = (
  props: ClientDemoRendererProps,
) => {
  const { children } = props;

  return children;
};

ClientDemoRenderer.displayName = displayName;
