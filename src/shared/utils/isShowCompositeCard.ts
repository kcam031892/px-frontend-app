import { PROFILE_OPTIONS_A } from 'shared/constants/PROFILE_OPTIONS';

export const isShowCompositeCard = (profileType: string) => {
  return !PROFILE_OPTIONS_A.includes(profileType);
};
