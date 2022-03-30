export const Range = (start: number, stop: number) => {
  if (start < stop) {
    return Array.from(Array(stop + 1).keys()).filter((i) => i >= start);
  }
  return Array.from(Array(start + 1).keys()).filter((i) => i >= stop);
};
