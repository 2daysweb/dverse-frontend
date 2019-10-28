import {
  FETCH_CANDIDATES_BEGIN,
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATES_FAILURE,
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