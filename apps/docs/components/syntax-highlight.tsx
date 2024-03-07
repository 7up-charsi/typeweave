import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
import hljs from 'highlight.js';

polyfill();

interface Props {
  code?: string;
  language?: string;
}

export const SyntaxHighlight = ({ code, language }: Props) => {
  if (!code || !language) return null;

  const highlited = hljs.highlight(code, { language }).value;

  return <Markup content={highlited} noWrap />;
};
