import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
  layoutData: any[] | null;
  setLayoutData: (data: any[]) => void;
  clearLayout: () => void;
  preferences: {
    wallColor: string;
    floorMaterial: string;
    furnitureStyle: string;
  };
  setPreferences: (prefs: Partial<LayoutState['preferences']>) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layoutData: null,
      setLayoutData: (data) => set({ layoutData: data }),
      clearLayout: () => set({ layoutData: null }),
      preferences: {
        wallColor: '#f97316', // default orange
        floorMaterial: 'wood',
        furnitureStyle: 'modern',
      },
      setPreferences: (prefs) => set((state) => ({ 
        preferences: { ...state.preferences, ...prefs } 
      })),
    }),
    {
      name: 'layout-storage',
    }
  )
);
