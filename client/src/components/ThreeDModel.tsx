// /components/ThreeDModel.js - USE THIS EXACT CODE adapted for TSX
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

export default function ThreeDModel({ layoutData }: { layoutData: any }) {
  const [model, setModel] = useState<any[] | null>(null);

  useEffect(() => {
    if (layoutData) {
      setModel(layoutData); // This would be the processed layout data
    }
  }, [layoutData]);

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
      {/* Adding lighting so the orange boxes are clearly visible and 3D */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />
      
      {/* Support zoom and rotate interactions as requested */}
      <OrbitControls makeDefault />

      {/* Ground plane for reference */}
      <gridHelper args={[30, 30]} />

      {model && model.map((room, index) => (
        <mesh key={index} position={room.position} castShadow receiveShadow>
          <boxGeometry args={[room.width, room.height, room.depth]} />
          <meshStandardMaterial color="orange" roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
    </Canvas>
  );
}
