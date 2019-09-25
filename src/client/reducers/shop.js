import {
  FETCH_SHOP_DATA_STARTED,
  FETCH_SHOP_DATA_FINISHED,
} from '../actions/types';

const initialState = {
  shop: {},
  fetched: false,
  fetching: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_SHOP_DATA_STARTED:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_SHOP_DATA_FINISHED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        shop: action.payload,
      };
    default: return state;
  }
};
