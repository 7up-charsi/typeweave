import * as alertDialog from './alert-dialog';
export { Overlay } from '@gist-ui/overlay';
export type { OverlayProps } from '@gist-ui/overlay';

// export types
export type {
  CloseProps,
  ContentProps,
  DescriptionProps,
  PortalProps,
  RootProps,
  TitleProps,
  TriggerProps,
} from './alert-dialog';

// export component
export const Root = alertDialog.Root;
export const Trigger = alertDialog.Trigger;
export const Close = alertDialog.Close;
export const Portal = alertDialog.Portal;
export const Content = alertDialog.Content;
export const Title = alertDialog.Title;
export const Description = alertDialog.Description;
export const Actions = alertDialog.Actions;
