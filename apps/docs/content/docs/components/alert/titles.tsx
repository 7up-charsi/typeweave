import { Alert } from '@webbo-ui/alert';

export default function App() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert color="danger" title="danger">
        This is an `danger` Alert with a scary title.
      </Alert>
      <Alert color="info" title="info">
        This is an `info` Alert with an informative title.
      </Alert>
      <Alert color="success" title="success">
        This is a `success` Alert with an encouraging title.
      </Alert>
      <Alert color="warning" title="warning">
        This is a `warning` Alert with a cautious title.
      </Alert>
    </div>
  );
}
