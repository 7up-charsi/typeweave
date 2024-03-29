import { highlightCode } from '@/lib/highlight-code';
import { Markup } from 'interweave';

interface PropProps extends React.HTMLAttributes<HTMLElement> {
  children?: string;
}

export const TsType = (props: PropProps) => {
  const { children, ...restProps } = props;

  if (!children) return;

  return (
    <code {...restProps} data-ts-type>
      <Markup content={highlightCode(children, 'ts')} noWrap />
    </code>
  );
};

TsType.displayName = 'TsType';
