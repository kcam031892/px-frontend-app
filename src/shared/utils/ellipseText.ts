export const ellipseText = (text: string, count = 30) => {
  return text.length > count ? text.substring(0, count) + '...' : text;
};
