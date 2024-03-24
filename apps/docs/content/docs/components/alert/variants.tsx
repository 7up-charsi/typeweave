import { Alert } from '@webbo-ui/alert';

export default function App() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert color="success" variant="border">
        This is a `border` variant Alert.
      </Alert>

      <Alert color="success" variant="flat">
        This is a `flat` variant Alert.
      </Alert>

      <Alert color="success" variant="solid">
        This is a `solid` variant Alert.
      </Alert>
    </div>
  );
}
