export const renderFloorNumber = (floorNumber: number) => {
  if (floorNumber === 0) return 'Ground Floor';
  if (floorNumber === 1) return '1st';
  if (floorNumber === 2) return '2nd';
  if (floorNumber === 3) return '3rd';
  if (floorNumber > 3) return `${floorNumber}th`;
};