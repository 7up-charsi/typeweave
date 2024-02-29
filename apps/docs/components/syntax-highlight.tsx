import { refractor } from 'refractor';
import refractor_tsx from 'refractor/lang/tsx';
import refractor_bash from 'refractor/lang/bash';
import refractor_json from 'refractor/lang/json';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
// @ts-ignore
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

refractor.register(refractor_tsx);
refractor.register(refractor_bash);
refractor.register(refractor_json);

interface Props {
  code?: string;
  language?: string;
}

export const SyntaxHighlight = ({ code, language }: Props) => {
  if (!code) return null;

  const tree = refractor.highlight(code, language ?? 'tsx');

  return toJsxRuntime(tree as never, { Fragment, jsx, jsxs });
};
