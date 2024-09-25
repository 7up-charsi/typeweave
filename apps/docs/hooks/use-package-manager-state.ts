import { create } from 'zustand';

type PackageManagers = 'npm' | 'pnpm' | 'yarn';

type Store = {
  packageManager: PackageManagers | '';
  isLoading: boolean;
  onChange: (value: PackageManagers) => void;
};

export const usePackageManagerState = create<Store>((set) => ({
  packageManager: '',
  isLoading: true,
  onChange: (value) => {
    localStorage.setItem('package-manager', value);
    set({ packageManager: value, isLoading: false });
  },
}));
