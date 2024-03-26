import { highlightCode } from '@/lib/highlight-code';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
polyfill();

interface Props {
  children?: string;
  className?: string;
}

export const Code = (props: Props) => {
  const { children, className } = props;

  if (!children) return;

  const lang = className?.match(/(?<prefix>language-)(?<lang>\w+)/)?.groups
    ?.lang;

  if (!lang)
    return (
      <code className="mx-1 inline-block rounded border border-muted-6 bg-muted-3 px-1 font-sans text-muted-11">
        {children}
      </code>
    );

  return (
    <code className={className}>
      <Markup content={highlightCode(children, lang)} noWrap />
    </code>
  );
};
