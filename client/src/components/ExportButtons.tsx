import { exportToPDF, exportToImage } from "@/utils/exportHelpers";
import { FileText, Image as ImageIcon } from "lucide-react";

export default function ExportButtons({ layoutData }: { layoutData: any }) {
  return (
    <div className="flex flex-col space-y-3">
      <button 
        onClick={() => exportToPDF(layoutData)}
        className="w-full bg-slate-700/50 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-slate-600 hover:border-emerald-500/50"
        data-testid="button-export-pdf"
      >
        <FileText className="w-5 h-5 text-emerald-400" />
        <span>Export as PDF</span>
      </button>
      
      <button 
        onClick={() => exportToImage()}
        className="w-full bg-slate-700/50 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-slate-600 hover:border-emerald-500/50"
        data-testid="button-export-image"
      >
        <ImageIcon className="w-5 h-5 text-emerald-400" />
        <span>Download Image</span>
      </button>
    </div>
  );
}
