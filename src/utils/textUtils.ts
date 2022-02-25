const urlRegex =
  /((http|ftp|https):\/\/)?(([a-zA-Z0-9._-]+\.(com|me|com\.au|net|co\.uk|co\.nz|co|us|org|guru))|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(\/[a-zA-Z0-9&%_./-~-]*)?/g;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const isContainsURL = (text: string) => {
  const matches = text.match(urlRegex);
  let isValid = false;
  if (matches && matches.length > 0) {
    matches.forEach((match) => {
      if (text.lastIndexOf('@' + match) === -1) {
        isValid = true;
      }
    });
  }
  return isValid;
};

export const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};
