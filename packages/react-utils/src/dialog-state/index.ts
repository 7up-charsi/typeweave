import { create } from 'zustand';

export type CreateDialogState = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
};

export const createDialogState = () =>
  create<CreateDialogState>((set) => ({
    open: false,
    handleOpenChange: (open) => {
      set({ open });
    },
    handleOpen: () => {
      set({ open: true });
    },
    handleClose: () => {
      set({ open: false });
    },
  }));
