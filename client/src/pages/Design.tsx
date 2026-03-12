import { useState, useEffect } from "react";
import { Link } from "wouter";
import DesignForm from "@/components/DesignForm";
import ThreeDModel from "@/components/ThreeDModel";
import FloorPlan2D from "@/components/FloorPlan2D";
import ExportButtons from "@/components/ExportButtons";
import { generateLayout } from "@/utils/api";
import { useLayoutStore } from "@/state/store";
import { ArrowLeft, Sparkles, Paintbrush } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Design() {
  const { setLayoutData, layoutData, preferences, setPreferences } = useLayoutStore();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-gray-700/50 backdrop-blur-md bg-black/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gray-300" />
              <span className="font-semibold text-white">Design Studio</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Create Your Layout</h1>
              <p className="text-slate-400 text-sm sm:text-base">Define your space preferences and watch AI generate your perfect 3D floor plan</p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Left Column: Form & Customization */}
              <div className="lg:col-span-1 space-y-6">
                {/* Form Card */}
                <div className="bg-gray-800/30 border border-gray-700/60 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-xl">
                  <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Design Preferences
                  </h2>
                  <DesignForm onSubmit={handleGenerate} isLoading={isLoading} />
                  {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm">
                      {error}
                    </div>
                  )}
                </div>

                {/* Customization Options (only show if layout is ready) */}
                <AnimatePresence>
                  {layoutData && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800/30 border border-gray-700/60 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-xl"
                    >
                      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <Paintbrush className="w-4 h-4 text-gray-300" />
                        Customization
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-300">Wall Color</label>
                          <div className="flex gap-2 flex-wrap">
                            {['#f97316', '#3b82f6', '#10b981', '#6b7280', '#eab308'].map(color => (
                              <button
                                key={color}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${preferences.wallColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setPreferences({ wallColor: color })}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm text-gray-300">Floor Material</label>
                          <select 
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                            value={preferences.floorMaterial}
                            onChange={(e) => setPreferences({ floorMaterial: e.target.value })}
                          >
                            <option value="wood">Wood</option>
                            <option value="marble">Marble / Tile</option>
                            <option value="metal">Industrial</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Export Options */}
                <AnimatePresence>
                  {layoutData && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800/30 border border-gray-700/60 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-xl"
                    >
                      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        Export Options
                      </h3>
                      <ExportButtons layoutData={layoutData} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: 2D & 3D Preview */}
              <div className="lg:col-span-3 space-y-6">
                {/* 2D Floor Plan */}
                <div className="bg-gray-800/30 border border-gray-700/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700/50 bg-black/50 flex justify-between items-center">
                    <h3 className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
                      <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'}`}></div>
                      2D Floor Plan
                    </h3>
                  </div>
                  <div className="relative p-2 sm:p-4 bg-gradient-to-br from-gray-900 to-black h-[300px] sm:h-[400px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full h-full"
                        >
                          <div className="w-full h-full border-2 border-dashed border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
                            {/* Skeleton loader for 2D map */}
                            <div className="w-3/4 h-3/4 relative animate-pulse flex flex-wrap gap-2 justify-center content-center">
                              <div className="w-1/3 h-1/3 bg-gray-700/50 rounded"></div>
                              <div className="w-1/4 h-1/2 bg-gray-700/40 rounded"></div>
                              <div className="w-1/2 h-1/4 bg-gray-700/60 rounded"></div>
                              <div className="w-1/4 h-1/3 bg-gray-700/50 rounded"></div>
                            </div>
                          </div>
                        </motion.div>
                      ) : layoutData ? (
                        <motion.div 
                          key="content"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="w-full h-full"
                        >
                          <FloorPlan2D layoutData={layoutData} />
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="empty"
                          className="text-gray-500 flex flex-col items-center space-y-3"
                        >
                          <div className="w-12 h-12 rounded-lg bg-gray-700/30 flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                          </div>
                          <span className="text-sm">Generate to see floor plan</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 3D Model */}
                <div className="bg-gray-800/30 border border-gray-700/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700/50 bg-black/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h3 className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
                      <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-400 animate-pulse' : 'bg-gray-400'}`}></div>
                      3D Preview
                    </h3>
                    <div className="text-xs font-medium text-gray-300 bg-gray-700/30 px-3 py-1 rounded-full border border-gray-600/50 inline-block self-start sm:self-auto">
                      Interactive - Use touch or mouse to rotate/zoom
                    </div>
                  </div>
                  <div 
                    className="relative bg-gradient-to-br from-gray-900 to-black h-[350px] sm:h-[450px]" 
                    data-testid="container-3d-preview"
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10"
                        >
                          <div className="flex flex-col items-center w-full max-w-xs px-6">
                            <div className="w-12 h-12 border-4 border-gray-500 border-t-white rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-300 font-medium mb-2">Generating Layout...</p>
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-white transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">{Math.round(progress)}%</p>
                          </div>
                        </motion.div>
                      ) : layoutData ? (
                        <motion.div 
                          key="content"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="w-full h-full"
                        >
                          <ThreeDModel layoutData={layoutData} />
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="empty"
                          className="absolute inset-0 flex items-center justify-center text-gray-500 flex-col space-y-4 p-4 text-center"
                        >
                          <div className="w-16 h-16 rounded-xl bg-gray-700/30 flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <p className="max-w-xs">
                            <span className="block font-medium text-gray-400">Fill out the form and generate</span>
                            <span className="text-sm">your custom 3D layout</span>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
