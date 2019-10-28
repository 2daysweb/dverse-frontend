import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "../actions";

const initialState = {
  user: null,
  email: "",
  password: "",
  loggedIn: false,
  loading: false,
  failure: false,
  token: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BEGIN:
      state = {
        ...state,
        loading: true,
        email: action.payload.email,
        password: action.payload.password
      };
      return state;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        loggedIn: true,
        loading: false,
        email: "",
        password: "",
        token: action.payload.token
      };
      return state;
    case LOGIN_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        failure: true
      };
      return state;
    case LOGOUT:
      state = { ...state, loggedIn: false, user: null, token: null };
      return state;
    default:
      return state;
  }
}

export default AuthReducer