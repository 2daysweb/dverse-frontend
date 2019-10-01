import { UPDATE_LATEST_CLICK } from "../actions";

const initialState = {
  latestClick: ""
};

const userInterfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LATEST_CLICK:
      return action.payload.click;
    default:
      return state;
  }
};

export default userInterfaceReducer;
