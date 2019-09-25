import {
  UPDATE_WEBHOOKS_STARTED,
  UPDATE_WEBHOOKS_FINISHED,
} from '../actions/types';

const initialState = {
  list: [],
  updated: false,
  updating: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_WEBHOOKS_STARTED:
      return {
        ...state,
        updating: true,
        updated: false,
      };
    case UPDATE_WEBHOOKS_FINISHED:
      return {
        ...state,
        updating: false,
        updated: true,
        list: action.payload,
      };
    default: return state;
  }
};
