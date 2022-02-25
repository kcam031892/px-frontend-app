import { combineReducers } from '@reduxjs/toolkit';

import resumeReducer from '../features/talent/resume/resumeSlice';
import statsReducer from '../features/settings/stats/statsSlice';
import skillReducer from '../features/settings/skill/skillSlice';
import myAccountReducer from '../features/settings/myAccount/myAccountSlice';
import appReducer from './appSlice';
import myProfileReducer from '../features/talent/profileSlice';
import biographyReducer from '../features/talent/biography/biographySlice';
import primaryImageReducer from '../features/talent/primaryImage/primaryImageSlice';
import accountReducer from '../features/account/accountSlice';
import optionReducer from '../features/common/optionSlice';
import socialReducer from '../features/settings/social/socialSlice';
import uploadReducer from '../features/media/uploadSlice';
import mediaReducer from '../features/media/mediaSlice';

const rootReducer = combineReducers({
  app: appReducer,
  resume: resumeReducer,
  stats: statsReducer,
  skill: skillReducer,
  myAccount: myAccountReducer,
  profile: myProfileReducer,
  biography: biographyReducer,
  primaryImage: primaryImageReducer,
  account: accountReducer,
  option: optionReducer,
  social: socialReducer,
  upload: uploadReducer,
  media: mediaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
