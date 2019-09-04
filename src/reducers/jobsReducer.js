import {
 
  FETCH_JOBS_BEGIN,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE
  

} from '../actions/index'


const initialState = {
  jobs: [],
  loading: false,
  error: null
};

export default function jobReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_JOBS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_JOBS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the jobs with the ones from the server
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs
      };
      case FETCH_JOBS_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have jobs to display anymore, so set `jobs` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the jobs around!
        // Do whatever seems right for your use case.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          jobs: []
        };
  
      default: 
      return state 
    }
  }
