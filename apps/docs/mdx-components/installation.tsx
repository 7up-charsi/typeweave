import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from '@typeweave/react/tabs';
import { Button } from '@typeweave/react/button';
import { Code } from './code';
import { Pre } from './pre';

interface Props {
  package?: string;
}

export const Installation = (props: Props) => {
  const { package: pkg } = props;

  return (
    <TabsRoot defaultValue="pnpm" className="not-prose native-pre">
      <TabsList className="gap-2">
        {[{ value: 'pnpm' }, { value: 'npm' }, { value: 'yarn' }].map(
          ({ value }, i) => (
            <TabsTrigger key={i} value={value}>
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

      {[
        { value: 'pnpm', bash: `pnpm add ${pkg}` },
        { value: 'npm', bash: `npm install ${pkg}` },
        { value: 'yarn', bash: `yarn add ${pkg}` },
      ].map(({ bash, value }, i) => (
        <TabsContent key={i} value={value}>
          <Pre>
            <Code className="language-bash">{bash}</Code>
          </Pre>
        </TabsContent>
      ))}
    </TabsRoot>
  );
};
