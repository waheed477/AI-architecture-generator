import { useState, useEffect } from "react";
import { Link } from "wouter";
import DesignForm from "@/components/DesignForm";
import ThreeDModel from "@/components/ThreeDModel";
import FloorPlan2D from "@/components/FloorPlan2D";
import ExportButtons from "@/components/ExportButtons";
import { generateLayout } from "@/utils/api";
import { useLayoutStore } from "@/state/store";
import { 
  ArrowLeft, Sparkles, Paintbrush, Moon, Sun, Undo2, Redo2, 
  Plus, Trash2, Box, Bed, Sofa, Grid as GridIcon, Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Design() {
  const { 
    setLayoutData, 
    layoutData, 
    preferences, 
    setPreferences,
    theme,
    setTheme,
    undo,
    redo,
    past,
    future,
    floors,
    activeFloorId,
    setActiveFloor,
    addFloor,
    selectedRoomId,
    setSelectedRoomId,
    addRoom,
    updateRoom,
    deleteRoom,
    addFurniture,
    saveHistory
  } = useLayoutStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const activeFloor = floors.find(f => f.id === activeFloorId);
  const selectedRoom = activeFloor?.rooms.find(r => r.id === selectedRoomId);

  // Keyboard shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Simulate progress when loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 90) return p;
          return p + Math.random() * 15;
        });
      }, 500);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generateLayout(formData);
      setLayoutData(response.data);
    } catch (err) {
      setError("Failed to generate layout. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFurniture = (type: string) => {
    if (!activeFloorId || !selectedRoomId) return;
    
    const sizes: Record<string, {w: number, d: number}> = {
      bed: { w: 1.6, d: 2 },
      sofa: { w: 2, d: 0.9 },
      table: { w: 1.2, d: 0.8 },
      chair: { w: 0.5, d: 0.5 }
    };

    addFurniture(activeFloorId, selectedRoomId, {
      type,
      x: 0,
      z: 0,
      width: sizes[type].w,
      depth: sizes[type].d,
      rotation: 0
    });
  };

  const isDark = theme === 'dark';
  const hasRooms = floors.some(f => f.rooms.length > 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-gray-900 via-black to-black' : 'bg-gradient-to-b from-slate-50 via-gray-100 to-white'} overflow-x-hidden`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${isDark ? 'bg-gray-600/5' : 'bg-blue-600/5'} rounded-full blur-3xl`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDark ? 'bg-gray-700/5' : 'bg-indigo-600/5'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className={`border-b backdrop-blur-md sticky top-0 z-50 transition-colors ${isDark ? 'border-gray-700/50 bg-black/50' : 'border-gray-200/80 bg-white/80'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/">
                <button className={`flex items-center gap-2 transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} data-testid="button-back">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              </Link>
              <div className="w-px h-6 bg-gray-500/30"></div>
              <div className="flex items-center gap-2">
                <Sparkles className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-blue-600'}`} />
                <span className={`font-semibold hidden sm:inline ${isDark ? 'text-white' : 'text-gray-900'}`}>Design Studio</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Undo / Redo */}
              <div className={`flex items-center gap-1 p-1 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                <button 
                  onClick={undo}
                  disabled={past.length === 0}
                  className={`p-1.5 rounded-md transition-colors ${past.length === 0 ? 'opacity-30 cursor-not-allowed' : (isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700')}`}
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={redo}
                  disabled={future.length === 0}
                  className={`p-1.5 rounded-md transition-colors ${future.length === 0 ? 'opacity-30 cursor-not-allowed' : (isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700')}`}
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2 rounded-lg border transition-colors ${isDark ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Sidebar: Tools & Settings */}
            <div className="lg:col-span-3 xl:col-span-3 space-y-6">
              
              {!hasRooms ? (
                <div className={`border rounded-xl p-5 sm:p-6 shadow-xl ${isDark ? 'bg-gray-800/30 border-gray-700/60 backdrop-blur-sm' : 'bg-white border-gray-200'}`}>
                  <h2 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Generate Layout
                  </h2>
                  <DesignForm onSubmit={handleGenerate} isLoading={isLoading} />
                  {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Floor Management */}
                  <div className={`border rounded-xl p-5 shadow-lg ${isDark ? 'bg-gray-800/30 border-gray-700/60' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Box className="w-4 h-4" />
                        Floors
                      </h3>
                      <button 
                        onClick={() => addFloor(`Floor ${floors.length + 1}`, floors.length)}
                        className="p-1 rounded hover:bg-blue-500/20 text-blue-500 transition-colors"
                        title="Add Floor"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {floors.map(floor => (
                        <div 
                          key={floor.id} 
                          onClick={() => setActiveFloor(floor.id)}
                          className={`flex items-center justify-between p-2 rounded cursor-pointer border ${activeFloorId === floor.id ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400' : (isDark ? 'border-gray-700 hover:bg-gray-700/50 text-gray-300' : 'border-gray-200 hover:bg-gray-50 text-gray-600')}`}
                        >
                          <span className="text-sm font-medium">{floor.name}</span>
                          <span className="text-xs opacity-60">{floor.rooms.length} rooms</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Room Presets */}
                  <div className={`border rounded-xl p-5 shadow-lg ${isDark ? 'bg-gray-800/30 border-gray-700/60' : 'bg-white border-gray-200'}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Plus className="w-4 h-4" />
                      Add Room
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Bedroom', w: 4, d: 4, c: '#3b82f6' },
                        { name: 'Living Room', w: 6, d: 5, c: '#f97316' },
                        { name: 'Kitchen', w: 3, d: 4, c: '#10b981' },
                        { name: 'Bathroom', w: 2, d: 2, c: '#8b5cf6' },
                      ].map(preset => (
                        <button
                          key={preset.name}
                          onClick={() => addRoom(activeFloorId, { name: preset.name, width: preset.w, depth: preset.d, color: preset.c })}
                          className={`text-xs p-2 rounded border text-left flex flex-col gap-1 transition-colors ${isDark ? 'border-gray-700 hover:bg-gray-700/50 text-gray-300' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}
                        >
                          <span className="font-medium">{preset.name}</span>
                          <span className="opacity-60">{preset.w}x{preset.d}m</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Details / Editing */}
                  <AnimatePresence>
                    {selectedRoom && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`border rounded-xl p-5 shadow-lg ${isDark ? 'bg-gray-800/50 border-blue-500/50' : 'bg-blue-50 border-blue-200'}`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`font-semibold truncate pr-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {selectedRoom.name}
                          </h3>
                          <button 
                            onClick={() => deleteRoom(activeFloorId, selectedRoom.id)}
                            className="p-1.5 rounded-md hover:bg-red-500/20 text-red-500 transition-colors"
                            title="Delete Room"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className={`text-xs block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Width (m)</label>
                              <input 
                                type="number" 
                                value={selectedRoom.width}
                                onChange={(e) => {
                                  saveHistory();
                                  updateRoom(activeFloorId, selectedRoom.id, { width: Number(e.target.value) })
                                }}
                                className={`w-full px-2 py-1.5 rounded text-sm border focus:outline-none focus:ring-1 focus:ring-blue-500 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              />
                            </div>
                            <div>
                              <label className={`text-xs block mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Depth (m)</label>
                              <input 
                                type="number" 
                                value={selectedRoom.depth}
                                onChange={(e) => {
                                  saveHistory();
                                  updateRoom(activeFloorId, selectedRoom.id, { depth: Number(e.target.value) })
                                }}
                                className={`w-full px-2 py-1.5 rounded text-sm border focus:outline-none focus:ring-1 focus:ring-blue-500 ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className={`text-xs block mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Add Furniture</label>
                            <div className="flex gap-2">
                              <button onClick={() => handleAddFurniture('bed')} className={`p-2 rounded border flex items-center justify-center flex-1 transition-colors hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-500 ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-600'}`}><Bed className="w-4 h-4" /></button>
                              <button onClick={() => handleAddFurniture('sofa')} className={`p-2 rounded border flex items-center justify-center flex-1 transition-colors hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-500 ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-600'}`}><Sofa className="w-4 h-4" /></button>
                              <button onClick={() => handleAddFurniture('table')} className={`p-2 rounded border flex items-center justify-center flex-1 transition-colors hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-500 ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-600'}`}><GridIcon className="w-4 h-4" /></button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* General Customization */}
                  <div className={`border rounded-xl p-5 shadow-lg ${isDark ? 'bg-gray-800/30 border-gray-700/60' : 'bg-white border-gray-200'}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Paintbrush className="w-4 h-4" />
                      Materials
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Global Wall Color</label>
                        <div className="flex gap-2 flex-wrap">
                          {['#f97316', '#3b82f6', '#10b981', '#6b7280', '#eab308', '#ef4444'].map(color => (
                            <button
                              key={color}
                              className={`w-6 h-6 rounded-full border-2 transition-all ${preferences.wallColor === color ? 'border-blue-500 scale-125' : 'border-transparent'}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setPreferences({ wallColor: color })}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Floor Material</label>
                        <select 
                          className={`w-full rounded-lg px-3 py-2 text-sm border focus:outline-none focus:ring-1 focus:ring-blue-500 ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                          value={preferences.floorMaterial}
                          onChange={(e) => setPreferences({ floorMaterial: e.target.value })}
                        >
                          <option value="wood">Wood</option>
                          <option value="marble">Marble / Tile</option>
                          <option value="metal">Industrial</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Export Options */}
                  <div className={`border rounded-xl p-5 shadow-lg ${isDark ? 'bg-gray-800/30 border-gray-700/60' : 'bg-white border-gray-200'}`}>
                    <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Export</h3>
                    <ExportButtons layoutData={activeFloor?.rooms} />
                  </div>
                </>
              )}
            </div>

            {/* Right Column: 2D & 3D Previews */}
            <div className="lg:col-span-9 xl:col-span-9 space-y-6">
              
              {!hasRooms && isLoading ? (
                 <div className="h-[600px] border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center p-8">
                   <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                   <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>AI is planning your space...</h3>
                   <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
                     <div 
                       className="h-full bg-blue-500 transition-all duration-300 ease-out"
                       style={{ width: `${progress}%` }}
                     ></div>
                   </div>
                 </div>
              ) : hasRooms ? (
                <>
                  {/* 2D Floor Plan */}
                  <div className={`border rounded-xl overflow-hidden shadow-2xl h-[400px] flex flex-col ${isDark ? 'bg-gray-800/50 border-gray-700/60' : 'bg-white border-gray-200'}`}>
                    <div className="flex-1 min-h-0 relative">
                      <FloorPlan2D />
                    </div>
                  </div>

                  {/* 3D Model */}
                  <div className={`border rounded-xl overflow-hidden shadow-2xl h-[500px] flex flex-col ${isDark ? 'bg-gray-800/50 border-gray-700/60' : 'bg-white border-gray-200'}`}>
                    <div className={`px-4 py-3 border-b flex justify-between items-center ${isDark ? 'border-gray-700/50 bg-black/40' : 'border-gray-200 bg-gray-50'}`}>
                      <h3 className={`font-semibold flex items-center gap-2 text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        3D Perspective
                      </h3>
                      <div className={`text-xs font-medium px-3 py-1 rounded-full border ${isDark ? 'text-gray-300 bg-gray-700/30 border-gray-600/50' : 'text-gray-600 bg-white border-gray-200'}`}>
                        Drag to rotate • Scroll to zoom
                      </div>
                    </div>
                    <div className="flex-1 relative" data-testid="container-3d-preview">
                      <ThreeDModel />
                    </div>
                  </div>
                </>
              ) : (
                <div className={`h-[600px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center ${isDark ? 'border-gray-700 bg-gray-800/20' : 'border-gray-300 bg-gray-50'}`}>
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                    <Box className={`w-10 h-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`text-2xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>No Layout Generated</h3>
                  <p className={`max-w-md ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Use the form on the left to define your preferences, and our AI will generate a complete 2D and 3D floor plan for you.
                  </p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
