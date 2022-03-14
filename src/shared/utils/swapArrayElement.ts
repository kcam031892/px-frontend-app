export const swapArrayElement = (array: string[][], sourceIndex: number, destinationIndex: number) => {
  const arr = array;
  const temp = array[sourceIndex];
  arr[sourceIndex] = arr[destinationIndex];
  arr[destinationIndex] = temp;
  return arr;
};
