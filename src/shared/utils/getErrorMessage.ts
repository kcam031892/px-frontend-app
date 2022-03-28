export const getErrorMessage = (touch: boolean | undefined, error: string | undefined) => {
  return touch && error ? error : '';
};
