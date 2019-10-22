import {
  FETCH_CANDIDATES_BEGIN,
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATES_FAILURE
} from "../actions/index";

const initialState = {
  candidates: [],
  loading: false,
  error: null
};

export default function candidatesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CANDIDATES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CANDIDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        candidates: action.payload.candidates
      };
    case FETCH_CANDIDATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        candidates: []
      };

    default:
      return state;
  }
}
