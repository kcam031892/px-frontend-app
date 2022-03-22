export const swap2DArrayElement = (array: string[][], sourceIndex: number, destinationIndex: number) => {
  const arr = array;
  const temp = array[sourceIndex];
  arr[sourceIndex] = arr[destinationIndex];
  arr[destinationIndex] = temp;
  return arr;
};

export const swapArrayElement = <T>(array: T[], sourceIndex: number, destinationIndex: number) => {
  const arr = array;
  const temp = array[sourceIndex];
  arr[sourceIndex] = arr[destinationIndex];
  arr[destinationIndex] = temp;
  return arr;
};
