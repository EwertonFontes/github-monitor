import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});

export const createRepositoryNotFound = (response, errorMessage) => ({
  type: types.CREATE_REPOSITORY_NOT_FOUND,
  payload: {response, errorMessage},
});

export const getCommitsSuccess = commits => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: commits,
});
