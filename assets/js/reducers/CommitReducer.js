import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  repositories: [],
  successMessage: false,
  errorMessage: false,
  total_pages: 0,
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload.results),
        total_pages: action.payload.total_pages
      };
    case types.GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: Object.values(action.payload),
      };
    case types.CREATE_REPOSITORY_SUCCESS: {
      return {...state, successMessage: action.payload.successMessage};
    }
    case types.CREATE_REPOSITORY_NOT_FOUND: {
      return {...state, errorMessage: action.payload.errorMessage};
    }
    default:
      return state;
  }
};

export default commitReducer;
