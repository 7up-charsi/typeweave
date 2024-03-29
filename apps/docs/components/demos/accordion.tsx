import * as Accordion from '@webbo-ui/accordion';

export default function AccordionDemo() {
  return (
    <Accordion.Root className="w-96" defaultValue={['accordion-1']}>
      <Accordion.Item value="accordion-1">
        <Accordion.Trigger>
          Accordion 1 with dummy content <Accordion.Arrow className="ml-auto" />
        </Accordion.Trigger>

        <Accordion.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          veritatis similique mollitia odio ducimus consectetur,
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="accordion-2">
        <Accordion.Trigger>
          Accordion 2 with dummy content <Accordion.Arrow className="ml-auto" />
        </Accordion.Trigger>

        <Accordion.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          veritatis similique mollitia odio ducimus consectetur,
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="accordion-3">
        <Accordion.Trigger>
          Accordion 3 with dummy content <Accordion.Arrow className="ml-auto" />
        </Accordion.Trigger>

        <Accordion.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          veritatis similique mollitia odio ducimus consectetur,
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
