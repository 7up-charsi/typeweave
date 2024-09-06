import { create } from 'zustand';

type Store = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
};

export const createDialogState = () =>
  create<Store>((set) => ({
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
