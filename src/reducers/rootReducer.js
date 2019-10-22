import { combineReducers } from "redux";
import candidates from "./candidatesReducer";
import jobs from "./jobsReducer";
import ui from "./uiReducer";
import user from "./userReducer";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  candidates,
  jobs,
  ui,
  user
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
