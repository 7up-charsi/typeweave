import { alert } from '@webbo-ui/theme';
import { Alert } from './';
import { Heart, Angry } from 'lucide-react';

const meta = {
  title: 'Components/Alert',
  component: Alert,
};

export default meta;

const ColorsTemplate = () => (
  <div className="flex flex-col gap-5">
    {Object.keys(alert.variants.color).map((color) => (
      <Alert key={color} color={color as never}>
        this is `{color}` variant
      </Alert>
    ))}
  </div>
);

export const Colors = {
  render: ColorsTemplate,
};

const VariantsTemplate = () => (
  <div className="flex flex-col gap-5">
    {Object.keys(alert.variants.variant).map((variant) => (
      <Alert key={variant} variant={variant as never} color="warning">
        this is `{variant}` variant
      </Alert>
    ))}
  </div>
);

export const Variants = {
  render: VariantsTemplate,
};

const TitleTemplate = () => (
  <div className="flex flex-col gap-5">
    {Object.keys(alert.variants.color).map((color) => (
      <Alert key={color} color={color as never} title={color}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam
        dolorem quisquam eaque excepturi, perferendis, numquam cumque neque unde
        quas rerum distinctio.
      </Alert>
    ))}
  </div>
);

export const Title = {
  render: TitleTemplate,
};

const ActionTemplate = () => (
  <div className="flex flex-col gap-5">
    {Object.keys(alert.variants.color).map((color) => (
      <Alert key={color} color={color as never} onClose={() => {}}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam
        dolorem quisquam eaque
      </Alert>
    ))}
  </div>
);

export const Action = {
  render: ActionTemplate,
};

const CustomIconTemplate = () => (
  <div className="flex flex-col gap-5">
    <Alert icon={<Heart />} color="success">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam
      dolorem quisquam eaque
    </Alert>
    <Alert icon={<Angry />} color="danger">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic totam
      dolorem quisquam eaque
    </Alert>
  </div>
);

export const CustomIcon = {
  render: CustomIconTemplate,
};
