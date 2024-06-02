import path from 'path';
import { access, readFile } from 'fs/promises';
import {
  Button,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from '@typeweave/react';
import { Code } from './code';
import { CopyButton } from '@/components/copy-button';
import { Pre } from './pre';

interface DemoProps {
  source?: string;
  preview?: string;
}

export const Demo = async (props: DemoProps) => {
  const { source, preview } = props;

  if (!source) return;

  const filePath = path.resolve(`./demos/${source}.tsx`);

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const code = await readFile(filePath, { encoding: 'utf-8' });

  return (
    <TabsRoot
      defaultValue="preview"
      className="not-prose native-pre border-muted-6"
    >
      <TabsList className="gap-2">
        <TabsTrigger value="preview">
          <Button
            size="sm"
            className="data-[selected=true]:data-[orientation=horizontal]:border-b-muted-9"
          >
            preview
          </Button>
        </TabsTrigger>

        <TabsTrigger value="code">
          <Button
            size="sm"
            className="data-[selected=true]:data-[orientation=horizontal]:border-b-muted-9"
          >
            code
          </Button>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div className="flex items-center justify-center rounded border border-inherit px-5 py-10">
          {preview}
        </div>
      </TabsContent>

      <TabsContent value="code">
        <Pre>
          <Code className="language-tsx">{code}</Code>
        </Pre>
      </TabsContent>
    </TabsRoot>
  );
};

Demo.displayName = 'Demo';
