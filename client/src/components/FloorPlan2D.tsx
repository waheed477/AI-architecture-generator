import { useEffect, useRef } from "react";

interface Room {
  id: string;
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  color?: string;
}

interface FloorPlan2DProps {
  layoutData: Room[];
}

export default function FloorPlan2D({ layoutData }: FloorPlan2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !layoutData || layoutData.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const padding = 40;
    const scale = 40; // pixels per unit

    // Clear canvas
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Calculate bounds for centering
    let minX = Infinity,
      maxX = -Infinity,
      minZ = Infinity,
      maxZ = -Infinity;

    layoutData.forEach((room) => {
      const x = room.position[0];
      const z = room.position[2];
      minX = Math.min(minX, x - room.width / 2);
      maxX = Math.max(maxX, x + room.width / 2);
      minZ = Math.min(minZ, z - room.depth / 2);
      maxZ = Math.max(maxZ, z + room.depth / 2);
    });

    const centerX = (canvas.width - padding * 2) / 2 + padding;
    const centerY = (canvas.height - padding * 2) / 2 + padding;
    const rangeX = maxX - minX || 10;
    const rangeZ = maxZ - minZ || 10;
    const maxRange = Math.max(rangeX, rangeZ);

    // Draw rooms
    layoutData.forEach((room, index) => {
      const x = room.position[0];
      const z = room.position[2];

      // Convert 3D position to 2D canvas coordinates
      const canvasX = centerX + ((x - (minX + maxX) / 2) * (scale * 8)) / maxRange;
      const canvasY = centerY + ((z - (minZ + maxZ) / 2) * (scale * 8)) / maxRange;

      const width = (room.width * scale) / 2;
      const depth = (room.depth * scale) / 2;

      // Draw room rectangle
      ctx.fillStyle = "rgba(249, 115, 22, 0.15)"; // Orange with transparency
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 2;
      ctx.fillRect(canvasX - width, canvasY - depth, width * 2, depth * 2);
      ctx.strokeRect(canvasX - width, canvasY - depth, width * 2, depth * 2);

      // Draw room label
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`Room ${index + 1}`, canvasX, canvasY - 10);

      // Draw dimensions
      ctx.fillStyle = "#6b7280";
      ctx.font = "11px Inter, sans-serif";
      ctx.fillText(`${room.width.toFixed(1)}m`, canvasX, canvasY + 10);
      ctx.fillText(`${room.depth.toFixed(1)}m`, canvasX, canvasY + 23);
    });

    // Draw title and legend
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 16px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Floor Plan View", padding, 25);

    // Draw legend
    ctx.fillStyle = "rgba(249, 115, 22, 0.15)";
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 2;
    ctx.fillRect(padding, canvas.height - 60, 20, 20);
    ctx.strokeRect(padding, canvas.height - 60, 20, 20);

    ctx.fillStyle = "#6b7280";
    ctx.font = "11px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("Room", padding + 30, canvas.height - 50);

    // Scale indicator
    ctx.fillStyle = "#9ca3af";
    ctx.font = "10px Inter, sans-serif";
    ctx.fillText(`Scale: 1 unit = ${(maxRange / 8).toFixed(1)}m`, padding, canvas.height - 10);
  }, [layoutData]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="w-full h-full border border-slate-600 rounded-lg bg-slate-100"
      data-testid="canvas-floor-plan"
    />
  );
}
