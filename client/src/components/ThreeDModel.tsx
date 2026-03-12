import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useLayoutStore } from "@/state/store";
import { useMemo } from "react";

export default function ThreeDModel() {
  const { floors, preferences, theme } = useLayoutStore();

  const materialProps = useMemo(() => ({
    roughness: preferences.floorMaterial === 'marble' ? 0.1 : preferences.floorMaterial === 'metal' ? 0.3 : 0.8,
    metalness: preferences.floorMaterial === 'metal' ? 0.8 : preferences.floorMaterial === 'marble' ? 0.2 : 0.1,
  }), [preferences.floorMaterial]);

  const isDark = theme === 'dark';

  return (
    <Canvas camera={{ position: [15, 15, 15], fov: 50 }} className="w-full h-full bg-slate-100 dark:bg-transparent transition-colors">
      <ambientLight intensity={isDark ? 0.6 : 0.8} />
      <directionalLight position={[10, 20, 10]} intensity={isDark ? 1.5 : 1} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />
      
      <OrbitControls makeDefault enableDamping dampingFactor={0.05} />

      <gridHelper args={[50, 50, isDark ? 0x444444 : 0xcccccc, isDark ? 0x222222 : 0xeeeeee]} />

      {floors.map((floor) => (
        <group key={floor.id} position={[0, floor.level * 3, 0]}>
          {/* Level indicator */}
          <Html position={[-10, 0, -10]}>
            <div className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap">
              {floor.name}
            </div>
          </Html>

          {floor.rooms.map((room) => (
            <group key={room.id} position={room.position}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[room.width, room.height, room.depth]} />
                <meshStandardMaterial 
                  color={room.color || preferences.wallColor || '#f97316'} 
                  {...materialProps}
                  transparent={true}
                  opacity={0.85}
                />
              </mesh>

              {/* Render Furniture */}
              {room.furniture?.map(furn => (
                <mesh 
                  key={furn.id} 
                  position={[furn.x, -room.height/2 + 0.25, furn.z]} 
                  rotation={[0, furn.rotation, 0]}
                  castShadow
                >
                  <boxGeometry args={[furn.width, 0.5, furn.depth]} />
                  <meshStandardMaterial color={furn.type === 'bed' ? '#3b82f6' : furn.type === 'sofa' ? '#ef4444' : '#10b981'} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}
    </Canvas>
  );
}
