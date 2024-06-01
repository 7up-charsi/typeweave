import {
  Button,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from '@typeweave/react';
// import { Code } from './code';

interface Props {
  package?: string;
}

export const Installation = (props: Props) => {
  const { package: pkg } = props;

  return (
    <TabsRoot defaultValue="pnpm" className="mt-4">
      <TabsList className="gap-3">
        {[{ value: 'pnpm' }, { value: 'npm' }, { value: 'yarn' }].map(
          ({ value }, i) => (
            <TabsTrigger key={i} value={value}>
              <Button size="sm">{value}</Button>
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
          <pre className="mt-0">
            {/* <Code className="language-bash">{bash}</Code> */}
            <code>{bash}</code>
          </pre>
        </TabsContent>
      ))}
    </TabsRoot>
  );
};
