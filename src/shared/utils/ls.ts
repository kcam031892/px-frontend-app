export const ls = () => {
  const setLS = (key: string, value: any) => {
    localStorage[key] = value;
  };
  const getLS = (key: string) => {
    return localStorage[key];
  };

  const removeLS = (key: string) => {
    delete localStorage[key];
  };
  const clearLS = () => {
    localStorage.clear();
  };

  return {
    setLS,
    getLS,
    removeLS,
    clearLS,
  };
};
