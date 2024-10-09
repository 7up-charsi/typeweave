import { PointerEvents } from '../pointer-events';
import { NumberInput, PasswordInput, Input as InputComp } from './';

const meta = {
  title: 'Components/Input',
};

export default meta;

const InputTemplate = () => (
  <div className="flex flex-col gap-5">
    <InputComp label="input label" helperText="this input is optional" />

    <InputComp
      required
      label="input label"
      error
      helperText="this input is required"
    />
  </div>
);

export const Input = {
  render: InputTemplate,
};

const ContentTemplate = () => (
  <InputComp
    label="input label"
    helperText="this input is optional"
    startContent={<p className="text-sm">kg</p>}
    endContent={<p className="text-sm">$$$</p>}
  />
);

export const StartEndContent = {
  name: 'Start / End content',
  render: ContentTemplate,
};

const PasswordTemplate = () => <PasswordInput required label="input label" />;

export const Password = {
  render: PasswordTemplate,
};

const ToggleButtonTemplate = () => (
  <PasswordInput
    required
    label="input label"
    renderToggleButton={({ onPress, ...props }, { isPassword }) => (
      <PointerEvents onPress={onPress}>
        <button {...props}>{isPassword ? 'show' : 'hide'}</button>
      </PointerEvents>
    )}
  />
);

export const ToggleButton = {
  render: ToggleButtonTemplate,
};

const NumberTemplate = () => (
  <NumberInput required label="input label" placeholder="placeholder" />
);

export const Number = {
  render: NumberTemplate,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
  },
  args: {
    step: 1,
    largeStep: 5,
  },
};

const SpinButtonsTemplate = () => (
  <NumberInput
    required
    label="input label"
    placeholder="placeholder"
    classNames={{
      inputWrapper: 'overflow-hidden',
      spinButtons: {
        wrapper: 'flex flex-col h-full absolute top-0 right-0',
        increase:
          'grow w-6 min-h-0 bg-muted-3 flex items-center justify-center hover:bg-muted-4 active:bg-muted-5',
        decrease:
          'grow w-6 min-h-0 bg-muted-3 flex items-center justify-center hover:bg-muted-4 active:bg-muted-5',
      },
    }}
    renderSpinButtons={({ decreaseProps, increaseProps, wrapperProps }) => (
      <div {...wrapperProps}>
        <button {...decreaseProps}>-</button>
        <button {...increaseProps}>+</button>
      </div>
    )}
  />
);

export const SpinButtons = {
  render: SpinButtonsTemplate,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
  },
  args: {
    step: 1,
    largeStep: 5,
  },
};

const MultilineTemplate = () => (
  <InputComp required label="multiline input" multiline />
);

export const Multiline = {
  render: MultilineTemplate,
};

const HideLabelTemplate = () => (
  <div className="flex flex-col gap-5">
    <InputComp
      required
      label="multiline input"
      hideLabel
      placeholder="Placeholder"
      helperText="this input is optional"
      startContent={<p className="text-sm">kg</p>}
      endContent={<p className="text-sm">$$$</p>}
    />

    <InputComp
      required
      label="multiline input"
      multiline
      hideLabel
      placeholder="Placeholder"
      helperText="this input is optional"
    />
  </div>
);

export const HideLabel = {
  render: HideLabelTemplate,
};
