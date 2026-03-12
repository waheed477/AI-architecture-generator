import { exportToPDF, exportToImage, exportToJSON, exportToDXF } from "@/utils/exportHelpers";
import { FileText, Image as ImageIcon, Download, Box } from "lucide-react";
import { useLayoutStore } from "@/state/store";

export default function ExportButtons({ layoutData }: { layoutData: any }) {
  const { floors } = useLayoutStore();

  return (
    <div className="flex flex-col space-y-3">
      <button 
        onClick={() => exportToPDF(layoutData)}
        className="w-full bg-white dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500/50"
        data-testid="button-export-pdf"
      >
        <FileText className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span>Export as PDF</span>
      </button>
      
      <button 
        onClick={() => exportToImage()}
        className="w-full bg-white dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500/50"
        data-testid="button-export-image"
      >
        <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span>Download Image</span>
      </button>

      <button 
        onClick={() => exportToJSON({ floors })}
        className="w-full bg-white dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500/50"
      >
        <Download className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span>Save Project (JSON)</span>
      </button>

      <button 
        onClick={() => exportToDXF(floors)}
        className="w-full bg-white dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500/50"
      >
        <Box className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span>Export CAD (DXF)</span>
      </button>
    </div>
  );
}
