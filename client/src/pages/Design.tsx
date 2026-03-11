import { useState } from "react";
import DesignForm from "@/components/DesignForm";
import ThreeDModel from "@/components/ThreeDModel";
import ExportButtons from "@/components/ExportButtons";
import { generateLayout } from "@/utils/api";
import { useLayoutStore } from "@/state/store";

export default function Design() {
  const { setLayoutData, layoutData } = useLayoutStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock API call to /api/generate-layout
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
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Design Your Layout</h1>
          <p className="text-gray-600 mt-2">Enter your preferences to generate a 3D floor plan.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <DesignForm onSubmit={handleGenerate} isLoading={isLoading} />
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>
            
            {layoutData && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Export Options</h3>
                <ExportButtons layoutData={layoutData} />
              </div>
            )}
          </div>

          {/* Right Column: 3D Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 h-[500px] lg:h-[600px] flex flex-col">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-md">
                <h3 className="font-semibold text-gray-800">3D Preview</h3>
                <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">Interactive</div>
              </div>
              <div className="flex-grow relative bg-[#f8f9fa]" data-testid="container-3d-preview">
                {layoutData ? (
                  <ThreeDModel layoutData={layoutData} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col space-y-3">
                    <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <p>Submit the form to generate a layout.</p>
                  </div>
                )}
                {isLoading && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="mt-4 text-blue-600 font-medium">Generating Layout...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
