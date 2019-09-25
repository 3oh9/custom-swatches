import axios from 'axios';
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
} from './types';

import {
  getApiProductsPath,
  getApiProductPath,
  searchApiProductsPath,
  getApiProductMetafieldsPath,
  postApiProductMetafieldsPath,
  deleteApiProductMetafieldPath,
} from '../utils/paths';

export const fetchProductsStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_STARTED, payload });
};

export const fetchProductsFinished = payload => (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_FINISHED, payload });
};

export const fetchProducts = (shop, limit, pageInfo = '') => (dispatch) => {
  dispatch(fetchProductsStarted());

  axios.post(`${getApiProductsPath}`, { shop, limit, pageInfo }).then((res) => {
    const { products, next, prev } = res.data.result;

    dispatch(fetchProductsFinished({ list: products, next, prev }));
  }, (error) => {
    dispatch(fetchProductsFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const searchProducts = (shop, limit, title = '') => (dispatch) => {
  dispatch(fetchProductsStarted());

  axios.post(`${searchApiProductsPath}`, { shop, limit, title }).then((res) => {
    const { products, next, prev } = res.data.result;

    dispatch(fetchProductsFinished({ list: products, next, prev }));
  }, (error) => {
    dispatch(fetchProductsFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const fetchProductStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_STARTED, payload });
};

export const fetchProductFinished = payload => (dispatch) => {
  dispatch({
    type: FETCH_PRODUCT_FINISHED,
    payload,
  });
};

export const fetchProduct = (shop, productId, cb) => (dispatch) => {
  dispatch(fetchProductStarted());

  axios.post(getApiProductPath(productId), { shop }).then((res) => {
    dispatch(fetchProductFinished(res.data.result.product));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(fetchProductFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const fetchProductMetafieldsStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_METAFIELDS_STARTED, payload });
};

export const fetchProductMetafieldsFinished = payload => (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_METAFIELDS_FINISHED, payload });
};

export const fetchProductMetafields = (shop, productId, cb) => (dispatch) => {
  dispatch(fetchProductMetafieldsStarted());
  axios.get(
    `${getApiProductMetafieldsPath(productId)}`,
    { params: { shop } },
  ).then((res) => {
    dispatch(fetchProductMetafieldsFinished(res.data.result.metafields));
    if (cb) cb(res.data.result.metafields);
  }, (error) => {
    dispatch(fetchProductMetafieldsFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const updateProductMetafieldsStarted = payload => (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_METAFIELDS_STARTED, payload });
};

export const updateProductMetafieldsFinished = payload => (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_METAFIELDS_FINISHED, payload });
};

export const updateProductMetafields = (shop, productId, metafield, cb) => (dispatch) => {
  dispatch(updateProductMetafieldsStarted());
  axios.post(
    `${postApiProductMetafieldsPath(productId)}`,
    { shop, metafield },
  ).then((res) => {
    dispatch(updateProductMetafieldsFinished(res.data.result.metafields));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(updateProductMetafieldsFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const deleteProductMetafieldStarted = payload => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_METAFIELD_STARTED, payload });
};

export const deleteProductMetafieldFinished = payload => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_METAFIELD_FINISHED, payload });
};

export const deleteProductMetafield = (shop, productId, metafieldId, cb) => (dispatch) => {
  dispatch(deleteProductMetafieldStarted());
  axios.delete(`${deleteApiProductMetafieldPath(productId, metafieldId)}?shop=${shop}`).then((res) => {
    dispatch(deleteProductMetafieldFinished(res.data.result));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(deleteProductMetafieldFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};
