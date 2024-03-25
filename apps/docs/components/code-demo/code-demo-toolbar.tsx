import { CodeDemoCopy } from './code-demo-copy';
import { CodeDemoReset } from './code-demo-reset';

export const CodeDemoToolbar = () => {
  return (
    <div className="flex h-14 items-center justify-end gap-3 border border-inherit px-5">
      {/* <CodeDemoSandbox /> */}
      <CodeDemoCopy />
      <CodeDemoReset />
    </div>
  );
};

CodeDemoToolbar.displayName = 'CodeDemoToolbar';
