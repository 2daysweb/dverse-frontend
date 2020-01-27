import { combineReducers } from "redux";
import auth from "./authReducer";
import candidates from "./candidatesReducer";
import jobs from "./jobsReducer";
import visibilityFilter from "./visibilityFilterReducer"
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  auth,
  candidates,
  jobs,
  visibilityFilter
});
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
