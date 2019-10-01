import {combineReducers} from 'redux';
import userReducer from './userReducer'
import jobsReducer from './jobsReducer';
import candidatesReducer from './candidatesReducer';
import latestClickReducer from './latestClickReducer';

export default combineReducers({
    jobs: jobsReducer,
    candidates: candidatesReducer,
    user: userReducer,
    latestClick: latestClickReducer
  })
  
 