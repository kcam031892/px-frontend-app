export const ls = () => {
  const setLS = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };
  const getLS = (key: string) => {
    const data = localStorage.getItem(key);
    return data;
  };

  const removeLS = (key: string) => {
    localStorage.removeItem(key);
  };
  return {
    setLS,
    getLS,
    removeLS,
  };
};
