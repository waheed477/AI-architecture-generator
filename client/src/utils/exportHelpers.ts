import { jsPDF } from "jspdf";

export const exportToPDF = (layoutData: any) => {
  // Create new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  let yPos = margin;

  // Title
  doc.setFontSize(20);
  doc.setFont("Courier", "bold");
  doc.text("Architecture Layout Report", margin, yPos);
  yPos += 15;

  // Summary Info
  doc.setFontSize(12);
  doc.setFont("Courier", "normal");
  doc.text(`Total Rooms: ${layoutData?.length || 0}`, margin, yPos);
  yPos += 8;

  let totalArea = 0;
  layoutData?.forEach((room: any) => {
    totalArea += room.width * room.depth;
  });
  doc.text(`Total Area: ${totalArea.toFixed(2)} sq units`, margin, yPos);
  yPos += 12;

  // Room Details Table
  doc.setFontSize(11);
  doc.setFont("Courier", "bold");
  doc.text("Room Specifications:", margin, yPos);
  yPos += 8;

  doc.setFont("Courier", "normal");
  doc.setFontSize(9);

  const tableHeaders = ["Room", "Width (m)", "Depth (m)", "Height (m)", "Area (sq m)"];
  let headerX = margin;
  const colWidth = contentWidth / 5;

  // Draw table header
  doc.setFont("Courier", "bold");
  tableHeaders.forEach((header, idx) => {
    doc.text(header, headerX + idx * colWidth, yPos);
  });
  yPos += 7;

  // Draw table rows
  doc.setFont("Courier", "normal");
  layoutData?.forEach((room: any, index: number) => {
    const area = (room.width * room.depth).toFixed(2);
    const rowData = [
      `Room ${index + 1}`,
      room.width.toFixed(1),
      room.depth.toFixed(1),
      room.height.toFixed(1),
      area
    ];

    rowData.forEach((data, idx) => {
      doc.text(data, headerX + idx * colWidth, yPos);
    });

    yPos += 7;

    // Check if we need a new page
    if (yPos > pageHeight - margin - 20) {
      doc.addPage();
      yPos = margin;
    }
  });

  // Capture 2D floor plan canvas
  const floorPlanCanvas = document.querySelector("[data-testid='canvas-floor-plan']") as HTMLCanvasElement;
  if (floorPlanCanvas) {
    yPos += 10;
    if (yPos > pageHeight - margin - 100) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFontSize(12);
    doc.setFont("Courier", "bold");
    doc.text("2D Floor Plan", margin, yPos);
    yPos += 15;

    const imgData = floorPlanCanvas.toDataURL("image/png");
    const imgWidth = contentWidth * 0.8;
    const imgHeight = (floorPlanCanvas.height / floorPlanCanvas.width) * imgWidth;

    doc.addImage(imgData, "PNG", margin + (contentWidth - imgWidth) / 2, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 10;
  }

  // Capture 3D canvas
  const threeDCanvas = document.querySelector("canvas:not([data-testid='canvas-floor-plan'])") as HTMLCanvasElement;
  if (threeDCanvas && yPos < pageHeight - margin - 100) {
    doc.setFontSize(12);
    doc.setFont("Courier", "bold");
    doc.text("3D Model View", margin, yPos);
    yPos += 15;

    const imgData = threeDCanvas.toDataURL("image/png");
    const imgWidth = contentWidth * 0.8;
    const imgHeight = (threeDCanvas.height / threeDCanvas.width) * imgWidth;

    if (yPos + imgHeight > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
    }

    doc.addImage(imgData, "PNG", margin + (contentWidth - imgWidth) / 2, yPos, imgWidth, imgHeight);
  }

  // Footer
  doc.setFontSize(8);
  doc.setFont("Courier", "normal");
  doc.text(
    `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
    margin,
    pageHeight - 10
  );

  // Save PDF
  doc.save("architecture-layout-report.pdf");
};

export const exportToImage = () => {
  // Grab the 3D canvas element rendered by React Three Fiber
  const canvas = document.querySelector("canvas:not([data-testid='canvas-floor-plan'])") as HTMLCanvasElement;
  if (canvas) {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "3d-layout-preview.png";
    link.href = dataURL;
    link.click();
  } else {
    alert("3D view not available for export");
  }
};
