export interface PasswordPrinciple {
  LengthInValid: boolean;
  LowerCaseInValid: boolean;
  UpperCaseInValid: boolean;
  NumbericInValid: boolean;
  SpecialInValid: boolean;
  IsValid: boolean;
}

export const validatePassword = (password: string): PasswordPrinciple => {
  password = password || '';
  const result = {
    LengthInValid: false,
    LowerCaseInValid: false,
    UpperCaseInValid: false,
    NumbericInValid: false,
    SpecialInValid: false,
    IsValid: false,
  };

  if (password.length === 0) {
    return result;
  }

  if (password.length < 8) {
    result.LengthInValid = true;
  }

  if (!/^(?=.*[a-z])[^]{1,}$/.test(password)) {
    result.LowerCaseInValid = true;
  }

  if (!/^(?=.*[A-Z])[^]{1,}$/.test(password)) {
    result.UpperCaseInValid = true;
  }

  if (!/^(?=.*\d)[^]{1,}$/.test(password)) {
    result.NumbericInValid = true;
  }

  if (!/^(?=.*[~`!@#$%^&*()\-_+={}[\]|;:"<>,./?])[^]{1,}$/.test(password)) {
    result.SpecialInValid = true;
  }

  result.IsValid =
    !result.SpecialInValid &&
    !result.NumbericInValid &&
    !result.UpperCaseInValid &&
    !result.LowerCaseInValid &&
    !result.LengthInValid;

  return result;
};
