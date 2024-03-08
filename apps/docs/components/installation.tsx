'use client';

import { Button } from '@webbo-ui/button';
import * as Tabs from '@webbo-ui/tabs';
import { Code } from './code';
import { Pre } from './pre';
import { useState } from 'react';
import { CopyCode } from './copy-code';

interface Props {
  package?: string;
}

export const Installation = (props: Props) => {
  const { package: pkg } = props;

  const [selected, setSelected] = useState('pnpm');

  return (
    <Tabs.Root value={selected} onValueChange={setSelected} className="gap-0">
      <Tabs.List className="gap-3">
        {[{ value: 'pnpm' }, { value: 'npm' }, { value: 'yarn' }].map(
          ({ value }, i) => (
            <Tabs.Trigger key={i} value={value}>
              <Button
                color={selected === value ? 'primary' : 'default'}
                variant={selected === value ? 'border' : 'text'}
                size="sm"
              >
                {value}
              </Button>
            </Tabs.Trigger>
          ),
        )}
      </Tabs.List>

      {[
        { value: 'pnpm', bash: `pnpm add ${pkg}` },
        { value: 'npm', bash: `npm install ${pkg}` },
        { value: 'yarn', bash: `yarn add ${pkg}` },
      ].map(({ bash, value }, i) => (
        <Tabs.Content key={i} value={value}>
          <Pre>
            <Code className="language-bash">{bash}</Code>
            <CopyCode code={bash} />
          </Pre>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
