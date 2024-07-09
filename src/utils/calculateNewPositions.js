import { calculateCenter } from "./calculateCenter";

export const calculateNewPositions = (originalPositions) => {
  const min = Math.min(...Object.values(originalPositions));
  const max = Math.max(...Object.values(originalPositions));
  const center = calculateCenter(min, max);

  const newPositions = {};
  for (const part in originalPositions) {
    newPositions[part] = originalPositions[part] - center;
  }

  return newPositions;
};
