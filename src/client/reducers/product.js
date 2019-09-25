import {
  FETCH_PRODUCTS_STARTED,
  FETCH_PRODUCTS_FINISHED,
  FETCH_PRODUCT_STARTED,
  FETCH_PRODUCT_FINISHED,
  FETCH_PRODUCT_METAFIELDS_STARTED,
  FETCH_PRODUCT_METAFIELDS_FINISHED,
  UPDATE_PRODUCT_METAFIELDS_STARTED,
  UPDATE_PRODUCT_METAFIELDS_FINISHED,
  DELETE_PRODUCT_METAFIELD_STARTED,
  DELETE_PRODUCT_METAFIELD_FINISHED,
} from '../actions/types';

const initialState = {
  item: {},
  list: [],
  metafields: [],
  fetched: false,
  fetching: false,
  fetchedOne: false,
  fetchingOne: false,
  fetchingMetafields: false,
  fetchedMetafields: false,
  updatingMetafields: false,
  updatedMetafields: false,
  deletingMetafields: false,
  deletedMetafields: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PRODUCTS_STARTED:
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    case FETCH_PRODUCTS_FINISHED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        ...action.payload,
      };
    case FETCH_PRODUCT_STARTED:
      return {
        ...state,
        fetchedOne: false,
        fetchingOne: true,
      };
    case FETCH_PRODUCT_FINISHED:
      return {
        ...state,
        fetchingOne: false,
        fetchedOne: true,
        item: action.payload,
      };
    case FETCH_PRODUCT_METAFIELDS_STARTED:
      return {
        ...state,
        fetchingMetafields: true,
        fetchedMetafields: false,
      };
    case FETCH_PRODUCT_METAFIELDS_FINISHED:
      return {
        ...state,
        fetchingMetafields: false,
        fetchedMetafields: true,
        metafields: action.payload,
      };
    case UPDATE_PRODUCT_METAFIELDS_STARTED:
      return {
        ...state,
        updatingMetafields: true,
        updatedMetafields: false,
      };
    case UPDATE_PRODUCT_METAFIELDS_FINISHED:
      return {
        ...state,
        updatingMetafields: false,
        updatedMetafields: true,
        ...action.payload,
      };
    case DELETE_PRODUCT_METAFIELD_STARTED:
      return {
        ...state,
        deletingMetafields: true,
        deletedMetafields: false,
      };
    case DELETE_PRODUCT_METAFIELD_FINISHED:
      return {
        ...state,
        deletingMetafields: false,
        deletedMetafields: true,
        ...action.payload,
      };
    default: return state;
  }
};
