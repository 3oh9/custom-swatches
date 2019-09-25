import axios from 'axios';
import {
  FETCH_THEMES_STARTED,
  FETCH_THEMES_FINISHED,
  FETCH_MAIN_THEME_STARTED,
  FETCH_MAIN_THEME_FINISHED,
} from './types';

import {
  getApiThemes,
  getApiMainTheme,
} from '../utils/paths';

export const fetchThemesStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_THEMES_STARTED, payload });
};

export const fetchThemesFinished = payload => (dispatch) => {
  dispatch({ type: FETCH_THEMES_FINISHED, payload });
};

export const fetchThemes = (shop, cb) => (dispatch) => {
  dispatch(fetchThemesStarted());

  axios.get(`${getApiThemes}`, { params: { shop } }).then((res) => {
    dispatch(fetchThemesFinished(res.data.result));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(fetchThemesFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const fetchMainThemeStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_MAIN_THEME_STARTED, payload });
};

export const fetchMainThemeFinished = payload => (dispatch) => {
  dispatch({ type: FETCH_MAIN_THEME_FINISHED, payload });
};

export const fetchMainTheme = (shop, cb) => (dispatch) => {
  dispatch(fetchMainThemeStarted());

  axios.get(`${getApiMainTheme}`, { params: { shop } }).then((res) => {
    dispatch(fetchMainThemeFinished(res.data.result.themes[0]));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(fetchMainThemeFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};
