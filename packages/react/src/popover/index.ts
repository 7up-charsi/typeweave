import * as popover from './popover';

export { Arrow } from '../popper';

// export types
export type {
  RootProps,
  TriggerProps,
  CloseProps,
  ContentProps,
  PortalProps,
  DescriptionProps,
  TitleProps,
} from './popover';

// export component
export const Root = popover.Root;
export const Trigger = popover.Trigger;
export const Close = popover.Close;
export const Content = popover.Content;
export const Portal = popover.Portal;
export const Description = popover.Description;
export const Title = popover.Title;
