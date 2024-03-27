import { Button } from '@webbo-ui/button';
import { useCodeDemoContext } from './code-demo-provider';

export const CodeDemoEditorToggle = () => {
  const { isEditorHide, toggleEditor } = useCodeDemoContext(
    'CodeDemoEditorToggle',
  );

  return (
    <Button onPress={toggleEditor} size="sm">
      {isEditorHide ? 'show editor' : 'hide editor'}
    </Button>
  );
};

CodeDemoEditorToggle.displayName = 'CodeDemoEditorToggle';
