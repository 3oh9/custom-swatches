import axios from 'axios';
import {
  FETCH_CONFIG_STARTED,
  FETCH_CONFIG_FINISHED,
  UPDATE_CONFIG_STARTED,
  UPDATE_CONFIG_FINISHED,
} from './types';

import { configPath } from '../utils/paths';

export const fetchConfigStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_CONFIG_STARTED, payload });
};

export const fetchConfigFinished = payload => (dispatch) => {
  dispatch({ type: FETCH_CONFIG_FINISHED, payload });
};

export const updateConfigStarted = payload => (dispatch) => {
  dispatch({ type: UPDATE_CONFIG_STARTED, payload });
};

export const updateConfigFinished = payload => (dispatch) => {
  dispatch({ type: UPDATE_CONFIG_FINISHED, payload });
};

export const fetchConfig = (identificator, cb) => (dispatch) => {
  dispatch(fetchConfigStarted());
  axios.get(`${configPath}?shop=${identificator}`).then((res) => {
    dispatch(fetchConfigFinished({ list: res.data.result }));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(fetchConfigFinished({
      list: [],
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const updateConfig = (params, cb) => (dispatch) => {
  dispatch(updateConfigStarted());
  axios.post(configPath, params).then((res) => {
    dispatch(updateConfigFinished(res.data.result));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(updateConfigFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};
