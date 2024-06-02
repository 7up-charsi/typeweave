import { CopyButton } from '@/components/copy-button';
import { highlightCode } from '@/lib/highlight-code';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
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
