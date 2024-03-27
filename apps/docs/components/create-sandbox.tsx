import LZString from 'lz-string';
import * as Tooltip from '@webbo-ui/tooltip';
import { Button } from '@webbo-ui/button';
import { Icon } from '@webbo-ui/icon';
import React from 'react';

export const CreateSandbox = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button
          isIconOnly
          size="sm"
          aria-label="open in code sandbox"
          onPress={() => openSandbox({})}
        >
          <Icon>
            <svg viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="M709.6 210l.4-.2h.2L512 96 313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"
              ></path>
            </svg>
          </Icon>
        </Button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content>
          <Tooltip.Arrow />
          Open in code sandbox
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

CreateSandbox.displayName = 'CreateSandbox';

const openSandbox = ({ files, codeVariant, initialFile }: any) => {
  const parameters = LZString.compressToBase64(JSON.stringify({ files }))
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
