import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage, errorMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage, errorMessage},
});

export const createRepositoryNotFound = (response, errorMessage, successMessage) => ({
  type: types.CREATE_REPOSITORY_NOT_FOUND,
  payload: {response, errorMessage, successMessage},
});

export const getRepositoriesSuccess = repositories => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});

export const getCommitsSuccess = commits => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: commits,
});
