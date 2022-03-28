import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slicers/user.slicer';
import resumeReducer from './slicers/resume.slicer';

const rootReducer = combineReducers({
  user: userReducer,
  resume: resumeReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
