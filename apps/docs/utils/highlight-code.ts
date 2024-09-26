import { refractor } from 'refractor/lib/core.js';
import { toHtml } from 'hast-util-to-html';

import markup from 'refractor/lang/markup';
import bash from 'refractor/lang/bash';
import tsx from 'refractor/lang/tsx';
import jsx from 'refractor/lang/jsx';
import css from 'refractor/lang/css';

refractor.register(tsx);
refractor.register(jsx);
refractor.register(css);
refractor.register(markup);
refractor.register(bash);

export const highlightCode = (
  code: string,
  language: string = 'tsx',
) => {
  return toHtml(refractor.highlight(code, language) as never);
};
