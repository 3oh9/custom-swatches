import {
  FETCH_ASSETS_STARTED,
  FETCH_ASSETS_FINISHED,
  FETCH_ASSET_BY_KEY_STARTED,
  FETCH_ASSET_BY_KEY_FINISHED,
  UPDATE_ASSET_STARTED,
  UPDATE_ASSET_FINISHED,
  DELETE_ASSET_STARTED,
  DELETE_ASSET_FINISHED,
} from '../actions/types';

const initialState = {
  assets: [],
  assetByKey: {},
  fetchingAssets: false,
  fetchedAssets: false,
  fetchingAssetByKey: false,
  fetchedAssetByKey: false,
  updatingAsset: false,
  updatedAsset: false,
  deletingAsset: false,
  deletedAsset: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ASSETS_STARTED:
      return {
        ...state,
        fetchingAssets: true,
        fetchedAssets: false,
      };
    case FETCH_ASSETS_FINISHED:
      return {
        ...state,
        fetchingAssets: false,
        fetchedAssets: true,
        assets: action.payload,
      };
    case FETCH_ASSET_BY_KEY_STARTED:
      return {
        ...state,
        fetchingAssetByKey: true,
        fetchedAssetByKey: false,
      };
    case FETCH_ASSET_BY_KEY_FINISHED:
      return {
        ...state,
        fetchingAssetByKey: false,
        fetchedAssetByKey: true,
        assetByKey: action.payload,
      };
    case UPDATE_ASSET_STARTED:
      return {
        ...state,
        updatingAsset: true,
        updatedAsset: false,
      };
    case UPDATE_ASSET_FINISHED:
      return {
        ...state,
        updatingAsset: false,
        updatedAsset: true,
        asset: action.payload,
      };
    case DELETE_ASSET_STARTED:
      return {
        ...state,
        deletingAsset: true,
        deletedAsset: false,
      };
    case DELETE_ASSET_FINISHED:
      return {
        ...state,
        deletingAsset: false,
        deletedAsset: true,
        ...action.payload,
      };
    default: return state;
  }
};
