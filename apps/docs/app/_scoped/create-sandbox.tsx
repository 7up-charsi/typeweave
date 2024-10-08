import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@typeweave/react/tooltip';
import { Button } from '@typeweave/react/button';
import { Codesandbox } from 'lucide-react';
import LZString from 'lz-string';
import React from 'react';

export const CreateSandbox = () => {
  return (
    <TooltipRoot>
      <TooltipTrigger>
        <Button
          isIconOnly
          size="sm"
          aria-label="open in code sandbox"
          onPress={() => openSandbox({})}
        >
          <Codesandbox />
        </Button>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent>
          <TooltipArrow />
          Open in code sandbox
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  );
};

CreateSandbox.displayName = 'CreateSandbox';

const openSandbox = ({
  files,
  codeVariant,
  initialFile,
}: Record<string, unknown>) => {
  const parameters = LZString.compressToBase64(
    JSON.stringify({ files }),
  )
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

  const form = document.createElement('form');
  form.method = 'POST';
  form.target = '_blank';
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define';

  const parametersInput = document.createElement('input');
  parametersInput.type = 'hidden';
  parametersInput.name = 'parameters';
  parametersInput.value = parameters;
  form.appendChild(parametersInput);

  const queryInput = document.createElement('input');
  queryInput.type = 'hidden';
  queryInput.name = 'query';
  queryInput.value = `file=${initialFile}${codeVariant === 'TS' ? '.tsx' : '.js'}`;
  form.appendChild(queryInput);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};
