import { useRef, useMemo } from "react";
import { useLayoutStore } from "@/state/store";
import { motion } from "framer-motion";
import { Bed, Sofa, Grid } from "lucide-react";

export default function FloorPlan2D() {
  const { floors, activeFloorId, updateRoom, saveHistory, theme, selectedRoomId, setSelectedRoomId } = useLayoutStore();
  const floor = floors.find(f => f.id === activeFloorId);
  const rooms = floor?.rooms || [];

  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1 unit = 25 pixels
  const SCALE = 25;

  // Calculate total area
  const totalArea = useMemo(() => {
    return rooms.reduce((acc, r) => acc + (r.width * r.depth), 0);
  }, [rooms]);

  if (!floor) return null;

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center p-2 text-xs border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        <span>Floor: {floor.name}</span>
        <span>Total Area: {totalArea.toFixed(1)} sq m</span>
        <span>Scale: 1m = {SCALE}px</span>
      </div>
      
      <div 
        ref={containerRef} 
        className="relative flex-1 w-full h-full overflow-hidden bg-slate-50 dark:bg-gray-950 touch-none"
        onClick={() => setSelectedRoomId(null)}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, ${isDark ? '#4b5563' : '#9ca3af'} 1px, transparent 1px), linear-gradient(to bottom, ${isDark ? '#4b5563' : '#9ca3af'} 1px, transparent 1px)`,
            backgroundSize: `${SCALE}px ${SCALE}px`
          }}
        />

        {/* Center origin */}
        <div className="absolute top-1/2 left-1/2 w-0 h-0">
          {rooms.map((room) => {
            const w = room.width * SCALE;
            const h = room.depth * SCALE;
            const x = room.position[0] * SCALE;
            const y = room.position[2] * SCALE;
            
            const isSelected = selectedRoomId === room.id;

            return (
              <motion.div
                key={room.id}
                drag
                dragMomentum={false}
                onDragStart={() => {
                  saveHistory();
                  setSelectedRoomId(room.id);
                }}
                onDragEnd={(e, info) => {
                   const newX = room.position[0] + info.offset.x / SCALE;
                   const newZ = room.position[2] + info.offset.y / SCALE;
                   updateRoom(floor.id, room.id, { position: [newX, room.position[1], newZ] });
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoomId(room.id);
                }}
                style={{
                  width: w,
                  height: h,
                  x: x - w/2,
                  y: y - h/2,
                  backgroundColor: isSelected ? `${room.color || '#f97316'}80` : `${room.color || '#f97316'}40`,
                  borderColor: room.color || "#f97316",
                  zIndex: isSelected ? 10 : 1,
                }}
                className={`absolute border-2 flex items-center justify-center cursor-move transition-colors shadow-sm ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-black' : ''}`}
              >
                <div className="absolute inset-0 pointer-events-none p-1 flex flex-col justify-between">
                  <span className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white truncate drop-shadow-md bg-white/50 dark:bg-black/50 px-1 rounded-sm w-fit self-center">
                    {room.name}
                  </span>
                  <span className="text-[9px] text-gray-800 dark:text-gray-200 self-end font-mono">
                    {room.width.toFixed(1)}x{room.depth.toFixed(1)}m
                  </span>
                </div>

                {/* Render Furniture in 2D */}
                {room.furniture?.map(furn => {
                  const fw = furn.width * SCALE;
                  const fd = furn.depth * SCALE;
                  return (
                    <motion.div
                      key={furn.id}
                      className="absolute bg-blue-500/50 border border-blue-600 rounded-sm flex items-center justify-center text-blue-900 shadow-sm"
                      style={{
                        width: fw,
                        height: fd,
                        left: '50%',
                        top: '50%',
                        x: furn.x * SCALE - fw/2,
                        y: furn.z * SCALE - fd/2,
                        rotate: furn.rotation * (180 / Math.PI)
                      }}
                    >
                      {furn.type === 'bed' && <Bed className="w-3 h-3" />}
                      {furn.type === 'sofa' && <Sofa className="w-3 h-3" />}
                      {furn.type === 'table' && <Grid className="w-3 h-3" />}
                    </motion.div>
                  )
                })}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
