// Scene configuration for Three.js
// This file can hold common scene setups, lighting configurations, etc.

export const defaultCamera = {
  position: [10, 10, 10],
  fov: 50
};

export const defaultLighting = [
  { type: 'ambient', intensity: 0.5 },
  { type: 'directional', position: [10, 10, 5], intensity: 1 }
];
