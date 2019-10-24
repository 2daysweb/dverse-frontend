import { combineReducers } from "redux";
import candidates from "./candidatesReducer";
import jobs from "./jobsReducer";
import auth from "./authReducer";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  auth,
  candidates,
  jobs,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
