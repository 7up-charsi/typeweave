import { createRequire } from '@/lib/utils';
import React from 'react';
import * as JSX_Runtime from 'react/jsx-runtime';
import { transform } from 'sucrase';
import * as Alert from '@webbo-ui/alert';
import * as Button from '@webbo-ui/button';
import * as Icon from '@webbo-ui/icon';
import { useCodeDemoContext } from './code-demo-provider';

const imports = {
  'react/jsx-runtime': JSX_Runtime,
  '@webbo-ui/alert': Alert,
  '@webbo-ui/button': Button,
  '@webbo-ui/icon': Icon,
};

const scope = {};

const exports: Record<string, any> = {};

const finalScope: Record<string, unknown> = {
  React,
  require: createRequire(imports),
  ...scope,
  exports,
};

export const CodeDemoPreview = () => {
  const { code } = useCodeDemoContext('CodeDemoPreview');

  const transformedCode = transform(code, {
    transforms: ['jsx', 'typescript', 'imports'],
    production: true,
    jsxRuntime: 'automatic',
  }).code.substring(13); // substring is to remove leading `"use strict";`

  const scopeKeys = Object.keys(finalScope);
  const scopeValues = scopeKeys.map((key) => finalScope[key]);

  new Function(...scopeKeys, transformedCode)(...scopeValues);

  const Element = exports.default;

  return (
    <div className="mt-4 flex min-h-48 items-center justify-center rounded-t border border-b-0 border-inherit p-5">
      <Element />
    </div>
  );
};

CodeDemoPreview.displayName = 'CodeDemoPreview';
