import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Furniture {
  id: string;
  type: string; // 'bed', 'sofa', 'table', 'chair'
  x: number;
  z: number;
  width: number;
  depth: number;
  rotation: number;
}

export interface Room {
  id: string;
  name: string;
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  color?: string;
  furniture: Furniture[];
}

export interface Floor {
  id: string;
  name: string;
  level: number;
  rooms: Room[];
}

export interface LayoutState {
  floors: Floor[];
  activeFloorId: string;
  selectedRoomId: string | null;
  theme: 'dark' | 'light';
  preferences: {
    wallColor: string;
    floorMaterial: string;
    furnitureStyle: string;
    wallThickness: number;
  };
  
  past: any[];
  future: any[];

  layoutData: any[] | null;
  
  // Actions
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;

  setLayoutData: (data: any[]) => void;
  clearLayout: () => void;

  setFloors: (floors: Floor[]) => void;
  addFloor: (name: string, level: number) => void;
  setActiveFloor: (id: string) => void;
  copyFloor: (sourceId: string, name: string, level: number) => void;

  setSelectedRoomId: (id: string | null) => void;

  addRoom: (floorId: string, room: Partial<Room>) => void;
  updateRoom: (floorId: string, roomId: string, updates: Partial<Room>) => void;
  deleteRoom: (floorId: string, roomId: string) => void;

  addFurniture: (floorId: string, roomId: string, furniture: Omit<Furniture, 'id'>) => void;
  updateFurniture: (floorId: string, roomId: string, furnId: string, updates: Partial<Furniture>) => void;
  deleteFurniture: (floorId: string, roomId: string, furnId: string) => void;

  setTheme: (theme: 'dark' | 'light') => void;
  setPreferences: (prefs: Partial<LayoutState['preferences']>) => void;
}

const getSnapshot = (state: any) => ({
  floors: JSON.parse(JSON.stringify(state.floors)),
  activeFloorId: state.activeFloorId,
  selectedRoomId: state.selectedRoomId,
  theme: state.theme,
  preferences: JSON.parse(JSON.stringify(state.preferences)),
});

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      floors: [{ id: 'f1', name: 'Ground Floor', level: 0, rooms: [] }],
      activeFloorId: 'f1',
      selectedRoomId: null,
      theme: 'dark',
      preferences: {
        wallColor: '#f97316',
        floorMaterial: 'wood',
        furnitureStyle: 'modern',
        wallThickness: 0.2,
      },
      past: [],
      future: [],
      layoutData: null,

      saveHistory: () => {
        const snap = getSnapshot(get());
        set((state) => ({
          past: [...state.past, snap],
          future: [],
        }));
      },

      undo: () => {
        set((state) => {
          if (state.past.length === 0) return state;
          const previous = state.past[state.past.length - 1];
          const newPast = state.past.slice(0, state.past.length - 1);
          return {
            past: newPast,
            future: [getSnapshot(state), ...state.future],
            ...previous,
          };
        });
      },

      redo: () => {
        set((state) => {
          if (state.future.length === 0) return state;
          const next = state.future[0];
          const newFuture = state.future.slice(1);
          return {
            past: [...state.past, getSnapshot(state)],
            future: newFuture,
            ...next,
          };
        });
      },

      setLayoutData: (data) => {
        get().saveHistory();
        const rooms = data.map((r: any, i: number) => ({
          ...r,
          id: `room-${Date.now()}-${i}`,
          name: `Room ${i + 1}`,
          color: get().preferences.wallColor,
          furniture: []
        }));
        set({
          layoutData: data,
          floors: [{ id: 'f1', name: 'Ground Floor', level: 0, rooms }],
          activeFloorId: 'f1',
          selectedRoomId: null
        });
      },

      clearLayout: () => {
        get().saveHistory();
        set({ 
          layoutData: null,
          floors: [{ id: 'f1', name: 'Ground Floor', level: 0, rooms: [] }],
          selectedRoomId: null 
        });
      },

      setFloors: (floors) => {
        get().saveHistory();
        set({ floors });
      },

      addFloor: (name, level) => {
        get().saveHistory();
        const newFloor = { id: `floor-${Date.now()}`, name, level, rooms: [] };
        set((state) => ({ floors: [...state.floors, newFloor], activeFloorId: newFloor.id, selectedRoomId: null }));
      },

      copyFloor: (sourceId, name, level) => {
        get().saveHistory();
        const source = get().floors.find(f => f.id === sourceId);
        if (!source) return;
        const newRooms = source.rooms.map(r => ({
          ...r,
          id: `room-${Date.now()}-${Math.random()}`
        }));
        const newFloor = { id: `floor-${Date.now()}`, name, level, rooms: newRooms };
        set((state) => ({ floors: [...state.floors, newFloor], activeFloorId: newFloor.id, selectedRoomId: null }));
      },

      setActiveFloor: (id) => set({ activeFloorId: id, selectedRoomId: null }),
      
      setSelectedRoomId: (id) => set({ selectedRoomId: id }),

      addRoom: (floorId, room) => {
        get().saveHistory();
        const newId = `room-${Date.now()}`;
        set((state) => ({
          floors: state.floors.map(f => f.id === floorId ? {
            ...f,
            rooms: [...f.rooms, {
              id: newId,
              name: 'New Room',
              width: 5, height: 3, depth: 5,
              position: [0, 0, 0],
              furniture: [],
              color: state.preferences.wallColor,
              ...room
            } as Room]
          } : f),
          selectedRoomId: newId
        }));
      },

      updateRoom: (floorId, roomId, updates) => {
        set((state) => ({
          floors: state.floors.map(f => f.id === floorId ? {
            ...f,
            rooms: f.rooms.map(r => r.id === roomId ? { ...r, ...updates } : r)
          } : f)
        }));
      },

      deleteRoom: (floorId, roomId) => {
        get().saveHistory();
        set((state) => ({
          floors: state.floors.map(f => f.id === floorId ? {
            ...f,
            rooms: f.rooms.filter(r => r.id !== roomId)
          } : f),
          selectedRoomId: state.selectedRoomId === roomId ? null : state.selectedRoomId
        }));
      },

      addFurniture: (floorId, roomId, furniture) => {
        get().saveHistory();
        set((state) => ({
          floors: state.floors.map(f => f.id === floorId ? {
            ...f,
            rooms: f.rooms.map(r => r.id === roomId ? {
              ...r,
              furniture: [...r.furniture, { ...furniture, id: `furn-${Date.now()}` }]
            } : r)
          } : f)
        }));
      },

      updateFurniture: (floorId, roomId, furnId, updates) => {
        set((state) => ({
          floors: state.floors.map(f => f.id === floorId ? {
            ...f,
            rooms: f.rooms.map(r => r.id === roomId ? {
              ...r,
              furniture: r.furniture.map(furn => furn.id === furnId ? { ...furn, ...updates } : furn)
            } : r)
          } : f)
        }));
      },

      deleteFurniture: (floorId, roomId, furnId) => {
        get().saveHistory();
        set((state) => ({
          floors: state.floors.map(f => f.id === floorId ? {
            ...f,
            rooms: f.rooms.map(r => r.id === roomId ? {
              ...r,
              furniture: r.furniture.filter(furn => furn.id !== furnId)
            } : r)
          } : f)
        }));
      },

      setTheme: (theme) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },

      setPreferences: (prefs) => {
        get().saveHistory();
        set((state) => ({ preferences: { ...state.preferences, ...prefs } }));
      }
    }),
    {
      name: 'layout-storage-v3',
      partialize: (state) => ({ 
        floors: state.floors, 
        theme: state.theme, 
        preferences: state.preferences,
        activeFloorId: state.activeFloorId 
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  )
);
