import axios from 'axios';
import { FETCH_SHOP_DATA_STARTED, FETCH_SHOP_DATA_FINISHED } from './types';

import { shopInfoPath } from '../utils/paths';

export const fetchShopDataStarted = payload => (dispatch) => {
  dispatch({ type: FETCH_SHOP_DATA_STARTED, payload });
};

export const fetchShopDataFinished = payload => (dispatch) => {
  dispatch({ type: FETCH_SHOP_DATA_FINISHED, payload });
};

export const fetchShopData = (identificator, cb) => (dispatch) => {
  dispatch(fetchShopDataStarted());
  axios.get(`${shopInfoPath}?shop=${identificator}`).then((res) => {
    dispatch(fetchShopDataFinished({ result: res.data }));
    if (cb) cb(res.data);
  }, (error) => {
    dispatch(fetchShopDataFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};
