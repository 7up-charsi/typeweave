import React from 'react';
import {
  MenuArrow,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from './';
import {
  CircleCheckBigIcon,
  CircleIcon,
  HeartIcon,
  HeartOffIcon,
} from 'lucide-react';
import { Button } from '../button';

const meta = {
  title: 'Components/Menu',
};

export default meta;

const Template = (args) => {
  const ref = React.useRef<HTMLButtonElement>(null);

  const [favrouite, setFavrouite] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState('radio item 1');

  React.useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    });
  }, []);

  return (
    <div className="h-[300vh] w-[300vw] flex pt-24 justify-center">
      <MenuRoot defaultOpen {...args}>
        <MenuTrigger>
          <Button ref={ref}>open menu</Button>
        </MenuTrigger>

        <MenuPortal>
          <MenuContent
            aria-roledescription="control menu"
            className="w-[170px]"
          >
            <MenuArrow />

            <MenuGroup label="actions">
              <MenuItem>add</MenuItem>
              <MenuItem>edit</MenuItem>
              <MenuItem disabled>delete</MenuItem>
            </MenuGroup>

            <MenuSeparator />

            <MenuGroup label="status">
              <MenuCheckboxItem
                icon={args.customIcon ? <HeartOffIcon /> : undefined}
                checkedIcon={args.customIcon ? <HeartIcon /> : undefined}
                checked={favrouite}
                onChange={setFavrouite}
              >
                active
              </MenuCheckboxItem>
              <MenuCheckboxItem
                icon={args.customIcon ? <HeartOffIcon /> : undefined}
                checkedIcon={args.customIcon ? <HeartIcon /> : undefined}
                disabled
                checked={!args.customIcon}
              >
                notifications
              </MenuCheckboxItem>
            </MenuGroup>

            <MenuSeparator />

            <MenuRadioGroup
              label="current bill"
              onChange={setRadioValue}
              value={radioValue}
            >
              <MenuRadioItem
                icon={args.customIcon ? <CircleIcon /> : undefined}
                checkedIcon={
                  args.customIcon ? <CircleCheckBigIcon /> : undefined
                }
                value="radio item 1"
              >
                paid
              </MenuRadioItem>
              <MenuRadioItem
                icon={args.customIcon ? <CircleIcon /> : undefined}
                checkedIcon={
                  args.customIcon ? <CircleCheckBigIcon /> : undefined
                }
                value="radio item 2"
              >
                unpaid
              </MenuRadioItem>
              <MenuRadioItem
                icon={args.customIcon ? <CircleIcon /> : undefined}
                checkedIcon={
                  args.customIcon ? <CircleCheckBigIcon /> : undefined
                }
                value="radio item 3"
                disabled
              >
                always paid
              </MenuRadioItem>
            </MenuRadioGroup>
          </MenuContent>
        </MenuPortal>
      </MenuRoot>
    </div>
  );
};

export const Default = {
  render: Template,
};

const LoopTemplate = () => <Template loop />;

export const Loop = {
  render: LoopTemplate,
};

const CustomIconsTemplate = () => <Template customIcon />;

export const CustomIcons = {
  render: CustomIconsTemplate,
};
