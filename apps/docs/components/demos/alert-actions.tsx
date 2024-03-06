'use client';

import { Alert } from '@webbo-ui/alert';
import { Button } from '@webbo-ui/button';

export const AlertActions = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Alert color="danger" onClose={() => {}}>
        This is `danger` Alert with default action button.
      </Alert>

      <Alert color="info" onClose={() => {}}>
        This is `info` Alert with default action button.
      </Alert>

      <Alert
        color="success"
        onClose={() => {}}
        action={
          <Button color="success" size="sm">
            UNDO
          </Button>
        }
      >
        This is `success` Alert with default action button.
      </Alert>

      <Alert
        color="warning"
        onClose={() => {}}
        action={
          <Button color="warning" size="sm">
            UNDO
          </Button>
        }
      >
        This is `warning` Alert with default action button.
      </Alert>
    </div>
  );
};
