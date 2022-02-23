export const getBase64 = (image: any, callback: (...args: any) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(image);
};
