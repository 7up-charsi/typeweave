// @ts-nocheck

import * as Accordion from '@webbo-ui/accordion';

export default function App() {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Trigger>
          <Accordion.Arrow />
        </Accordion.Trigger>
        <Accordion.Content />
      </Accordion.Item>
    </Accordion.Root>
  );
}
