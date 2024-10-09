import { Button } from '../button';
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContent,
  TabsRootProps,
} from './';

const meta = {
  title: 'Components/Tabs',
};

export default meta;

const Template = (args: TabsRootProps) => (
  <TabsRoot {...args} defaultValue="tab-1">
    <TabsList className="gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <TabsTrigger key={i} value={`tab-${i + 1}`}>
          <Button size="sm">tab {i + 1}</Button>
        </TabsTrigger>
      ))}
    </TabsList>

    {Array.from({ length: 3 }).map((_, i) => (
      <TabsContent
        key={i}
        value={`tab-${i + 1}`}
        className="border border-muted-7 rounded p-3"
      >
        <h2 className="text-lg mb-2">Tab {i + 1}</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          natus ex exercitationem eius modi nihil, odit ducimus eaque inventore?
          Vero recusandae delectus fugit error ratione ipsam repudiandae dolorum
          accusamus possimus!
        </p>
      </TabsContent>
    ))}
  </TabsRoot>
);

export const Horizontal = {
  render: Template,
};

const VerticalTemplate = () => <Template orientation="vertical" />;

export const Vertical = {
  render: VerticalTemplate,
};

const HorizontalLoopTemplate = () => <Template loop />;

export const HorizontalLoop = {
  render: HorizontalLoopTemplate,
};

const VerticalLoopTemplate = () => <Template orientation="vertical" loop />;

export const VerticalLoop = {
  render: VerticalLoopTemplate,
};

const ManualSelectionTemplate = () => <Template loop activationMode="manual" />;

export const ManualSelection = {
  render: ManualSelectionTemplate,
};
