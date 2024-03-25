'use client';

import React from 'react';
import { CodeDemoEditor } from './code-demo-editor';
import { CodeDemoPreview } from './code-demo-preview';
import { CodeDemoToolbar } from './code-demo-toolbar';
import { CodeDemoProvider } from './code-demo-provider';

interface Props {
  code: string;
  language: string;
}

export const CodeDemoContainer = async (props: Props) => {
  const { code, language } = props;

  return (
    <div className="border-muted-6">
      <CodeDemoProvider code={code} language={language}>
        <CodeDemoPreview />
        <CodeDemoToolbar />
        <CodeDemoEditor />
      </CodeDemoProvider>
    </div>
  );
};
