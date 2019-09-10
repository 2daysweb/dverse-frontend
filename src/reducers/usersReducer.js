import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
  } from "../actions/index";
  
  const initialState = {
    users: [],
    loading: false,
    error: null
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_USERS_BEGIN:
        // Start fresh
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_USERS_SUCCESS:
        // DONE: set loading "false".
        // replace users with the ones from the server
        return {
          ...state,
          loading: false,
          users: action.payload.users
        };
      case FETCH_USERS_FAILURE:
        // Request failed, and done. So set loading to "false".
        // Save the error for potential display on UI
        // Since failed, no need to set the users, so set to empty array
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          users: []
        };
  
      default:
        return state;
    }
  }
  