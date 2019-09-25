import {
  FETCH_CONFIG_STARTED,
  FETCH_CONFIG_FINISHED,
  UPDATE_CONFIG_STARTED,
  UPDATE_CONFIG_FINISHED,
} from '../actions/types';

const initialState = {
  list: [],
  fetched: false,
  fetching: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CONFIG_STARTED:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_CONFIG_FINISHED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: action.payload.list,
      };
    case UPDATE_CONFIG_STARTED:
      return {
        ...state,
        updating: true,
        updated: false,
      };
    case UPDATE_CONFIG_FINISHED:
      return {
        ...state,
        updating: false,
        updated: true,
        list: state.list.length > 0 ? state.list.map((l) => {
          if (l.name === action.payload.name) {
            return action.payload;
          } return l;
        }) : [action.payload],
      };
    default: return state;
  }
};
