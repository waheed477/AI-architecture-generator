// Mock API utility for generating layout

export const generateLayout = async (data: any) => {
  // Simulate network request to /api/generate-layout
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const { size, rooms, style } = data;
  
  // Create a mock 3D room layout based on parameters
  const layout = [];
  const roomCount = rooms || 4;
  
  // Very simplistic algorithm to generate some distinct orange boxes (rooms)
  for (let i = 0; i < roomCount; i++) {
    // Determine size
    const width = 2 + Math.random() * 3;
    const height = style === 'Classic' ? 3.5 : (style === 'Minimalistic' ? 2.5 : 3);
    const depth = 2 + Math.random() * 3;
    
    // Position them roughly in a circle or line
    const angle = (i / roomCount) * Math.PI * 2;
    const radius = 4;
    
    layout.push({
      id: `room-${i}`,
      width,
      height,
      depth,
      position: [Math.cos(angle) * radius, height/2, Math.sin(angle) * radius],
      color: "orange"
    });
  }
  
  return {
    success: true,
    data: layout
  };
};
