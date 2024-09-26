import { highlightCode } from '@/utils/highlight-code';
import { CopyCodeButton } from './copy-code-button';
import { polyfill } from 'interweave-ssr';
import { Markup } from 'interweave';
polyfill();

interface CodeProps {
  children?: string;
  className?: string;
}

export const Code = (props: CodeProps) => {
  const { children, className, ...restProps } = props;

  if (!children) return;

  const lang = className?.match(/(?<prefix>language-)(?<lang>\w+)/)
    ?.groups?.lang;

  if (!lang)
    return (
      <code {...restProps} className={`${className} not-prose`}>
        {children}
      </code>
    );

  return (
    <code {...restProps} className={className}>
      <CopyCodeButton code={children} />

      <Markup content={highlightCode(children, lang)} noWrap />
    </code>
  );
};
