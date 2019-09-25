import axios from 'axios';
import {
  FETCH_ASSETS_STARTED,
  FETCH_ASSETS_FINISHED,
  FETCH_ASSET_BY_KEY_STARTED,
  FETCH_ASSET_BY_KEY_FINISHED,
  UPDATE_ASSET_STARTED,
  UPDATE_ASSET_FINISHED,
  DELETE_ASSET_STARTED,
  DELETE_ASSET_FINISHED,
} from './types';

import {
  getApiAssets,
  getApiAssetByKey,
  createApiAssetPath,
  deleteApiAssetPath,
} from '../utils/paths';

export const fetchAssetsStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_ASSETS_STARTED, payload });
};

export const fetchAssetsFinished = payload => (dispatch) => {
  dispatch({ type: FETCH_ASSETS_FINISHED, payload });
};

export const fetchAssets = (shop, themeId, cb) => (dispatch) => {
  dispatch(fetchAssetsStarted());

  axios.get(`${getApiAssets(themeId)}`, { params: { shop } }).then((res) => {
    dispatch(fetchAssetsFinished(res.data.result.assets));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(fetchAssetsFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const fetchAssetByKeyStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_ASSET_BY_KEY_STARTED, payload });
};

export const fetchAssetByKeyFinished = payload => (dispatch) => {
  dispatch({ type: FETCH_ASSET_BY_KEY_FINISHED, payload });
};

export const fetchAssetByKey = (shop, themeId, assetFolder, assetsKey, cb) => (dispatch) => {
  dispatch(fetchAssetByKeyStarted());

  axios.get(
    `${getApiAssetByKey(themeId, assetFolder, assetsKey)}`,
    { params: { shop } },
  ).then((res) => {
    dispatch(fetchAssetByKeyFinished(res.data.result.asset));
    if (cb) cb(res.data.result.asset);
  }, (error) => {
    dispatch(fetchAssetByKeyFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const deleteAssetStarted = payload => (dispatch) => {
  dispatch({ type: DELETE_ASSET_STARTED, payload });
};

export const deleteAssetFinished = payload => (dispatch) => {
  dispatch({ type: DELETE_ASSET_FINISHED, payload });
};

export const deleteAsset = (shop, themeId, key, cb) => (dispatch) => {
  dispatch(deleteAssetStarted());

  axios.delete(`${deleteApiAssetPath(themeId)}?shop=${shop}&key=${key}`).then((res) => {
    dispatch(deleteAssetFinished(res.data.result));
    if (cb) {
      cb(res.data.result);
    }
  }, (error) => {
    dispatch(deleteAssetFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const createAssetStarted = payload => (dispatch) => {
  dispatch({ type: UPDATE_ASSET_STARTED, payload });
};

export const createAssetFinished = payload => (dispatch) => {
  dispatch({ type: UPDATE_ASSET_FINISHED, payload });
};

export const createAsset = (shop, themeId, asset, cb) => (dispatch) => {
  dispatch(createAssetStarted());

  axios.put(`${createApiAssetPath(themeId)}`, { shop, asset }).then((res) => {
    dispatch(createAssetFinished(res.data.result.asset));
    if (cb) {
      cb(res.data.result.asset);
    }
  }, (error) => {
    dispatch(createAssetFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};
