import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@typeweave/react';
import { ChevronDown } from 'lucide-react';

export default function AccordionDemo() {
  return (
    <AccordionRoot className="w-96" defaultValue={['accordion-1']}>
      <AccordionItem value="accordion-1">
        <AccordionHeader>
          <AccordionTrigger>
            Accordion 1 with dummy content{' '}
            <ChevronDown className="group-data-[open=true]:rotate-180" />
          </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Explicabo veritatis similique mollitia odio ducimus
          consectetur,
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="accordion-2">
        <AccordionHeader>
          <AccordionTrigger>
            Accordion 2 with dummy content{' '}
            <ChevronDown className="group-data-[open=true]:rotate-180" />
          </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Explicabo veritatis similique mollitia odio ducimus
          consectetur,
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="accordion-3">
        <AccordionHeader>
          <AccordionTrigger>
            Accordion 3 with dummy content{' '}
            <ChevronDown className="group-data-[open=true]:rotate-180" />
          </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Explicabo veritatis similique mollitia odio ducimus
          consectetur,
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
