import * as tooltip from './tooltip';

export { Arrow } from '@webbo-ui/popper';

// export types
export type {
  ContentProps,
  RootProps,
  PortalProps,
  TriggerProps,
} from './tooltip';

// export component
export const Root = tooltip.Root;
export const Trigger = tooltip.Trigger;
export const Portal = tooltip.Portal;
export const Content = tooltip.Content;
