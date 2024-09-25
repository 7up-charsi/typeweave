'use client';

import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from '@typeweave/react/tabs';
import { usePackageManagerState } from '@/hooks/use-package-manager-state';
import { Skeleton } from '@typeweave/react/skeleton';
import { Button } from '@typeweave/react/button';
import { Code } from './code';
import { Pre } from './pre';

interface Props {
  package?: string;
}

export const Installation = (props: Props) => {
  const { package: pkg } = props;

  const { onChange, packageManager, isLoading } =
    usePackageManagerState();

  return (
    <TabsRoot
      value={packageManager}
      onValueChange={(value) => onChange(value as never)}
      className="my-6"
    >
      <TabsList className="gap-2">
        {[{ value: 'pnpm' }, { value: 'npm' }, { value: 'yarn' }].map(
          ({ value }, i) => (
            <TabsTrigger disabled={isLoading} key={i} value={value}>
              <Button
                size="sm"
                className="data-[selected=true]:data-[orientation=horizontal]:border-b-muted-9"
              >
                {value}
              </Button>
            </TabsTrigger>
          ),
        )}
      </TabsList>

      {isLoading && (
        <Skeleton variant="rounded" className="h-[45px]" />
      )}

      {!isLoading &&
        [
          { value: 'pnpm', bash: `pnpm add ${pkg}` },
          { value: 'npm', bash: `npm install ${pkg}` },
          { value: 'yarn', bash: `yarn add ${pkg}` },
        ].map(({ bash, value }, i) => (
          <TabsContent key={i} value={value} className="*:my-0">
            <Pre>
              <Code className="language-bash">{bash}</Code>
            </Pre>
          </TabsContent>
        ))}
    </TabsRoot>
  );
};
