import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, createRepositoryNotFound, getCommitsSuccess, getRepositoriesSuccess
} from '../actions/CommitActions';

export const getCommits = () => axios.get(`/api/commits/`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getCommitsByAuthors = (author_name) => axios.get(`/api/commits?author=${author_name}`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getCommitsByRepository = (repo_id) => axios.get(`/api/commits?repository=${repo_id}`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getRepositories = () => axios.get(`/api/repositories/`)
  .then((response) => {
    store.dispatch(getRepositoriesSuccess({...response.data}));
  });

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true, false));
    formDispatch(reset('repoCreate'));
  }).catch((error) => {
    const err = error.response;
    store.dispatch(createRepositoryNotFound(err.data, true, false));
    console.log(err);
  });
