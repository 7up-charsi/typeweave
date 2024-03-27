import React, { useState } from 'react';
import { createContextScope } from '@webbo-ui/context';

type CodeVariant = 'js' | 'ts';

interface Context {
  code: string;
  originalCode: string;
  language: string;
  onCodeChange: (code: string) => void;
  onReset: () => void;
  onCopy: () => void;
  codeVariant: CodeVariant;
  onCodeVariantChange: (val: CodeVariant) => void;
  isEditorHide: boolean;
  toggleEditor: () => void;
}

const CodeDemoContext = createContextScope<Context>('CodeDemoProvider');

const Provider = CodeDemoContext[0];
export const useCodeDemoContext = CodeDemoContext[1];

export interface CodeDemoProviderProps {
  code: string;
  language: string;
  children?: React.ReactNode;
}

export const CodeDemoProvider = (props: CodeDemoProviderProps) => {
  const { children, code: codeProp, language } = props;

  const [code, setCode] = React.useState(codeProp);
  const [codeVariant, setCodeVariant] = React.useState<CodeVariant>('ts');
  const [isEditorHide, setIsEditorHide] = React.useState(true);

  return (
    <Provider
      code={code}
      originalCode={codeProp}
      onCodeChange={setCode}
      language={language}
      onReset={() => setCode(codeProp)}
      onCopy={() => navigator.clipboard.writeText(code)}
      codeVariant={codeVariant}
      onCodeVariantChange={setCodeVariant}
      isEditorHide={isEditorHide}
      toggleEditor={() => setIsEditorHide((prev) => !prev)}
    >
      {children}
    </Provider>
  );
};

CodeDemoProvider.displayName = 'CodeDemoProvider';
