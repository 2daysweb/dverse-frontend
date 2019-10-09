import {combineReducers} from 'redux';
import userReducer from './userReducer'
import jobsReducer from './jobsReducer';
import candidatesReducer from './candidatesReducer';
import latestClickReducer from './latestClickReducer';
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({
    jobs: jobsReducer,
    candidates: candidatesReducer,
    user: userReducer,
    latestClick: latestClickReducer
  })
  
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      storage.removeItem('persist:root')
      state = undefined
    }
  
    return appReducer(state, action)
  }


export default rootReducer
