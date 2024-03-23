// *-*-*-*-* Props *-*-*-*-*

import { ComponentProp } from '@/lib/types';
import { readFile } from 'fs/promises';
import path from 'path';
import { PropsRenderer } from './props-renderer';

export interface PropsProps {
  source?: string;
}

export const Props = async (props: PropsProps) => {
  const { source } = props;

  if (!source) return;

  const file = await readFile(path.resolve(`content/docs/props/${source}`), {
    encoding: 'utf-8',
  });

  const propsArr = JSON.parse(file) as ComponentProp[];

  return <PropsRenderer content={propsArr} />;
};

Props.displayName = 'Props';
