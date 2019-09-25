import {
  FETCH_MAIN_THEME_STARTED,
  FETCH_MAIN_THEME_FINISHED,
  FETCH_THEMES_STARTED,
  FETCH_THEMES_FINISHED,
} from '../actions/types';

const initialState = {
  mainTheme: {},
  themes: [],
  fetchingMainTheme: false,
  fetchedMainTheme: false,
  fetchingThemes: false,
  fetchedThemes: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_MAIN_THEME_STARTED:
      return {
        ...state,
        fetchingMainTheme: true,
        fetchedMainTheme: false,
      };
    case FETCH_MAIN_THEME_FINISHED:
      return {
        ...state,
        fetchingMainTheme: false,
        fetchedMainTheme: true,
        mainTheme: action.payload,
      };
    case FETCH_THEMES_STARTED:
      return {
        ...state,
        fetchingThemes: true,
        fetchedThemes: false,
      };
    case FETCH_THEMES_FINISHED:
      return {
        ...state,
        fetchingThemes: false,
        fetchedThemes: true,
        themes: action.payload,
      };
    default: return state;
  }
};
