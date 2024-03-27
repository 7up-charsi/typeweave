import { CodeDemoCopy } from './code-demo-copy';
import { CodeDemoEditorToggle } from './code-demo-editor-toggle';
import { useCodeDemoContext } from './code-demo-provider';
import { CodeDemoReset } from './code-demo-reset';

export const CodeDemoToolbar = () => {
  const { isEditorHide } = useCodeDemoContext('CodeDemoToolbar');

  return (
    <div
      data-rounded={isEditorHide}
      className="flex h-14 items-center justify-end gap-3 border border-inherit px-5 data-[rounded=true]:rounded-b"
    >
      {/* <CodeDemoSandbox /> */}

      {isEditorHide ? null : <CodeDemoCopy />}
      {isEditorHide ? null : <CodeDemoReset />}

      <CodeDemoEditorToggle />
    </div>
  );
};

CodeDemoToolbar.displayName = 'CodeDemoToolbar';
