import { Alert } from '@webbo-ui/alert';

export const AlertColors = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert color="danger">This is `danger` Alert.</Alert>

      <Alert color="info">This is `info` Alert.</Alert>

      <Alert color="success">This is `success` Alert.</Alert>

      <Alert color="warning">This is `warning` Alert.</Alert>
    </div>
  );
};
