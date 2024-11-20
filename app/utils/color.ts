export const getRandomColor = (): string => {
  const colors = [
    '#A6C7FF', // Light Sky Blue
    '#8AB7FF', // Soft Blue
    '#7A9EFF', // Pale Blue
    '#6495ED', // Cornflower Blue
    '#4682B4', // Steel Blue
    '#4169E1', // Royal Blue
    '#5F5FCC', // Blue Violet
    '#6A5ACD', // Slate Blue
    '#5C4C9C', // Dark Lavender Blue
    '#4B0082', // Indigo
    '#6A1B9A', // Amethyst
    '#7B3F00', // Deep Sky Blue
    '#5D3FD3', // Violet Blue
    '#4E5180', // Purple Blue
    '#3C3D6B', // Blue-Gray
    '#3A2A6A', // Deep Purple Blue
    '#251C58', // Dark Purple Blue
    '#6A4C9C', // Dark Lavender
    '#4E4F94', // Dark Violet Blue
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
