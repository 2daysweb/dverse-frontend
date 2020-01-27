import {
  REQUEST_CANDIDATES_BEGIN,
  REQUEST_CANDIDATES_SUCCESS,
  REQUEST_CANDIDATES_FAILURE,
  SELECT_CANDIDATE
} from "../actions";

const initialState = {
  candidates: [],
  loading: false,
  error: null,
  selectedCandidate: null
};

 const candidatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CANDIDATES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case REQUEST_CANDIDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        candidates: action.payload.candidates
      };
    case REQUEST_CANDIDATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        candidates: []
      };

    case SELECT_CANDIDATE:
      return {
        ...state,
        latestClick: "Show",
        selectedCandidate: action.payload.candidate
      };

    default:
      return state;
  }
}

export default candidatesReducer