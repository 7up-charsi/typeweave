import * as dialog from './dialog';
export { Overlay } from '@gist-ui/overlay';
export type { OverlayProps } from '@gist-ui/overlay';

// export types
export type {
  RootProps,
  ContentProps,
  PortalProps,
  TriggerProps,
  CloseProps,
  DescriptionProps,
  TitleProps,
} from './dialog';

// export component
export const Root = dialog.Root;
export const Trigger = dialog.Trigger;
export const Close = dialog.Close;
export const Portal = dialog.Portal;
export const Content = dialog.Content;
export const Title = dialog.Title;
export const Description = dialog.Description;
