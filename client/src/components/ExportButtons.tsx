import { exportToPDF, exportToImage } from "@/utils/exportHelpers";

export default function ExportButtons({ layoutData }: { layoutData: any }) {
  return (
    <div className="flex flex-col space-y-3">
      <button 
        onClick={() => exportToPDF(layoutData)}
        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
        data-testid="button-export-pdf"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Export as PDF
      </button>
      
      <button 
        onClick={() => exportToImage()}
        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
        data-testid="button-export-image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        Download Image
      </button>
    </div>
  );
}
