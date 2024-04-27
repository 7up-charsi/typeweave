import { createContextScope } from '../context';
import { useCallbackRef } from '../use-callback-ref';
import { MenuGroup, MenuGroupProps } from './menu-group';

export interface MenuRadioGroupProps extends Omit<MenuGroupProps, 'onChange'> {
  onChange?: (value: string) => void;
  value?: string;
}

interface MenuRadioGroupCtxProps {
  onChange?: (value: string) => void;
  value?: string;
}

const Comp_Name = 'MenuRadioGroup';

const [MenuRadioGroupCtx, useMenuRadioGroupCtx] =
  createContextScope<MenuRadioGroupCtxProps>(Comp_Name);

export { useMenuRadioGroupCtx };

export const MenuRadioGroup = (props: MenuRadioGroupProps) => {
  const { onChange: onChangeProp, value, ...restProps } = props;

  const onChange = useCallbackRef(onChangeProp);

  return (
    <MenuRadioGroupCtx onChange={onChange} value={value}>
      <MenuGroup {...restProps} />
    </MenuRadioGroupCtx>
  );
};

MenuRadioGroup.displayName = 'MenuRadioGroup';
