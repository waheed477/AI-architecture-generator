import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { useLayoutStore } from "@/state/store";

export default function ThreeDModel({ layoutData }: { layoutData: any }) {
  const [model, setModel] = useState<any[] | null>(null);
  const { preferences } = useLayoutStore();

  useEffect(() => {
    if (layoutData) {
      setModel(layoutData);
    }
  }, [layoutData]);

  // Map floor material preference to Three.js properties
  const materialProps = {
    roughness: preferences.floorMaterial === 'marble' ? 0.1 : preferences.floorMaterial === 'metal' ? 0.3 : 0.8,
    metalness: preferences.floorMaterial === 'metal' ? 0.8 : preferences.floorMaterial === 'marble' ? 0.2 : 0.1,
  };

  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
      {/* Adding lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />
      
      {/* Support zoom and rotate interactions on all devices */}
      <OrbitControls makeDefault enableDamping dampingFactor={0.05} />

      {/* Ground plane for reference */}
      <gridHelper args={[30, 30, 0x444444, 0x222222]} />

      {model && model.map((room, index) => (
        <mesh key={index} position={room.position} castShadow receiveShadow>
          <boxGeometry args={[room.width, room.height, room.depth]} />
          <meshStandardMaterial 
            color={preferences.wallColor || '#f97316'} 
            {...materialProps}
          />
        </mesh>
      ))}
    </Canvas>
  );
}
