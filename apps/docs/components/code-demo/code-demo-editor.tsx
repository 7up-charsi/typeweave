import Editor from 'react-simple-code-editor';
import { focusWithIn } from '@webbo-ui/theme';
import hljs from 'highlight.js';

import { useCodeDemoContext } from './code-demo-provider';

export const CodeDemoEditor = () => {
  const { code, onCodeChange, language } = useCodeDemoContext('CodeDemoEditor');

  return (
    <Editor
      value={code}
      onValueChange={onCodeChange}
      highlight={(code) => hljs.highlight(code, { language }).value}
      className={`rounded-b border border-t-0 border-inherit hover:ring-2 hover:ring-focus-8 ${focusWithIn}`}
      padding={20}
      textareaClassName="outline-none"
    />
  );
};

CodeDemoEditor.displayName = 'CodeDemoEditor';
