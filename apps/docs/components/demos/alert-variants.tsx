import { Alert } from '@webbo-ui/alert';

export const AlertVariants = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Alert color="warning" variant="border">
        border variant with dummy content
      </Alert>
      <Alert color="warning" variant="flat">
        flat variant with dummy content
      </Alert>
      <Alert color="warning" variant="solid">
        solid variant with dummy content
      </Alert>
    </div>
  );
};
