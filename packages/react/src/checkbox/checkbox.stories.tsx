import { Checkbox, CheckboxProps, checkboxStyles } from './';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: checkboxStyles.defaultVariants,
};

export default meta;

const Template = (args: CheckboxProps) => (
  <div className="flex flex-col gap-4">
    <Checkbox {...args} indeterminate label="indeterminate and md size" />
    <Checkbox {...args} label="default and md size" />

    <Checkbox
      {...args}
      indeterminate
      label="indeterminate and sm size"
      size="sm"
    />
    <Checkbox {...args} label="default and sm size" size="sm" />
  </div>
);

export const Default = {
  render: Template,
};
