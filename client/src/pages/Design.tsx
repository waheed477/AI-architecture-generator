import { useState } from "react";
import { Link } from "wouter";
import DesignForm from "@/components/DesignForm";
import ThreeDModel from "@/components/ThreeDModel";
import ExportButtons from "@/components/ExportButtons";
import { generateLayout } from "@/utils/api";
import { useLayoutStore } from "@/state/store";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function Design() {
  const { setLayoutData, layoutData } = useLayoutStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-slate-700/50 backdrop-blur-md bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <button className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white">Design Studio</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">Create Your Layout</h1>
              <p className="text-slate-400">Define your space preferences and watch AI generate your perfect 3D floor plan</p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Form */}
              <div className="lg:col-span-1 space-y-6">
                {/* Form Card */}
                <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 backdrop-blur-sm shadow-xl">
                  <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    Design Preferences
                  </h2>
                  <DesignForm onSubmit={handleGenerate} isLoading={isLoading} />
                  {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300 text-sm">
                      {error}
                    </div>
                  )}
                </div>

                {/* Export Options */}
                {layoutData && (
                  <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm shadow-xl">
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Export Options
                    </h3>
                    <ExportButtons layoutData={layoutData} />
                  </div>
                )}
              </div>

              {/* Right Column: 3D Preview */}
              <div className="lg:col-span-2">
                <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden shadow-2xl h-[500px] lg:h-[600px] flex flex-col backdrop-blur-sm">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-900/50 flex justify-between items-center">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      3D Preview
                    </h3>
                    <div className="text-xs font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/50">
                      Interactive - Use mouse to rotate
                    </div>
                  </div>

                  {/* Canvas Area */}
                  <div 
                    className="flex-grow relative bg-gradient-to-br from-slate-900 to-slate-800" 
                    data-testid="container-3d-preview"
                  >
                    {layoutData ? (
                      <ThreeDModel layoutData={layoutData} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-500 flex-col space-y-4">
                        <div className="w-16 h-16 rounded-xl bg-slate-700/30 flex items-center justify-center">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <p className="text-center max-w-xs">
                          <span className="block font-medium text-slate-400">Fill out the form and generate</span>
                          <span className="text-sm">your custom 3D layout</span>
                        </p>
                      </div>
                    )}

                    {/* Loading Overlay */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="mt-4 text-blue-300 font-medium">Generating Layout...</p>
                        </div>
                      </div>
                    )}
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
