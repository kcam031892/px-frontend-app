import { combineReducers } from '@reduxjs/toolkit';

import resumeReducer from './slicers/resume.slicer';
import userReducer from './slicers/user.slicer';

const rootReducer = combineReducers({
  user: userReducer,
  resume: resumeReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
