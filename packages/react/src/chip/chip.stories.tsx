import { Chip, chipStyles } from './';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: chipStyles.defaultVariants,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(chipStyles.variants.variant),
    },
    color: {
      control: 'select',
      options: Object.keys(chipStyles.variants.color),
    },
    size: {
      control: 'select',
      options: Object.keys(chipStyles.variants.size),
    },
  },
};

export default meta;

const Template = (args) => (
  <div className="p-5 flex flex-col gap-6 items-center">
    {(
      Object.keys(chipStyles.variants.variant) as [
        keyof typeof chipStyles.variants.variant,
      ]
    ).map((variant, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        <span className="text-muted-11 pl-3 uppercase font-bold place-self-start text-sm border-l-2 border-muted-9">
          {variant}
        </span>

        <div className="flex flex-wrap gap-4">
          {(
            Object.keys(chipStyles.variants.color) as [
              keyof typeof chipStyles.variants.color,
            ]
          ).map((color, i) => (
            <Chip
              key={i}
              color={color}
              variant={variant}
              label="Chip Comp"
              onDelete={() => {
                console.log('onDelete');
              }}
              onPress={() => {
                console.log('onPress');
              }}
              size={args.size}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Default = {
  render: Template,
  args: {
    deleteable: true,
  },
};
