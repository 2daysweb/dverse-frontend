import {combineReducers} from 'redux';
import jobsReducer from './jobsReducer';
import visibilityFilterReducer from './visibilityFilterReducer';


export default combineReducers({
    jobs: jobsReducer,
    filters: visibilityFilterReducer
  })
  
 