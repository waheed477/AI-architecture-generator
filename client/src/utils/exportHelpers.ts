import { jsPDF } from "jspdf";

export const exportToPDF = (layoutData: any) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text("AI Architecture Layout Report", 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Generated Layout Elements: ${layoutData?.length || 0} Rooms`, 20, 35);
  
  let yPos = 50;
  layoutData?.forEach((room: any, index: number) => {
    doc.text(`Room ${index + 1}: ${room.width.toFixed(1)}W x ${room.height.toFixed(1)}H x ${room.depth.toFixed(1)}D`, 20, yPos);
    yPos += 10;
  });
  
  doc.save("architecture-layout.pdf");
};

export const exportToImage = () => {
  // Grab the canvas element rendered by React Three Fiber
  const canvas = document.querySelector('canvas');
  if (canvas) {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'layout-preview.png';
    link.href = dataURL;
    link.click();
  } else {
    alert("3D view not available for export");
  }
};
