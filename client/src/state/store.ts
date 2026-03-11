import { create } from 'zustand';

interface LayoutState {
  layoutData: any[] | null;
  setLayoutData: (data: any[]) => void;
  clearLayout: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  layoutData: null,
  setLayoutData: (data) => set({ layoutData: data }),
  clearLayout: () => set({ layoutData: null }),
}));
