import { highlightCode } from '@/lib/highlight-code';
import { CopyButton } from './copy-button';
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
    <code {...restProps} className={`${className} not-prose`}>
      <div className="absolute right-4 top-2">
        <CopyButton code={children} />
      </div>

      <Markup content={highlightCode(children, lang)} noWrap />
    </code>
  );
};
