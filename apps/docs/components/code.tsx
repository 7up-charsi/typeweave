import { highlightCode } from '@/lib/highlight-code';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
polyfill();

interface Props {
  children?: string;
  className?: string;
}

export const Code = (props: Props) => {
  const { children, className, ...restProps } = props;

  if (!children) return;

  const lang = className?.match(/(?<prefix>language-)(?<lang>\w+)/)?.groups
    ?.lang;

  if (!lang)
    return (
      <code {...restProps} className={className}>
        {children}
      </code>
    );

  return (
    <code {...restProps} className={className}>
      <Markup content={highlightCode(children, lang)} noWrap />
    </code>
  );
};
