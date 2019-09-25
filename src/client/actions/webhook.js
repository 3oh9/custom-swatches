import axios from 'axios';
import {
  BULK_CREATE_WEBHOOKS_STARTED,
  BULK_CREATE_WEBHOOKS_FINISHED,
  UPDATE_WEBHOOKS_STARTED,
  UPDATE_WEBHOOKS_FINISHED,
} from './types';

import { webhooksPath } from '../utils/paths';

export const bulkCreateWebhooksStarted = payload => (dispatch) => {
  dispatch({ type: BULK_CREATE_WEBHOOKS_STARTED, payload });
};

export const bulkCreateWebhooksFinished = payload => (dispatch) => {
  dispatch({ type: BULK_CREATE_WEBHOOKS_FINISHED, payload });
};

export const updateWebhooksStarted = payload => (dispatch) => {
  dispatch({ type: UPDATE_WEBHOOKS_STARTED, payload });
};

export const updateWebhooksFinished = payload => (dispatch) => {
  dispatch({ type: UPDATE_WEBHOOKS_FINISHED, payload });
};

export const bulkCreateWebhooks = (shop, webhooks) => (dispatch) => {
  dispatch(bulkCreateWebhooksStarted());
  axios.post(webhooksPath, { shop, webhooks }).then((res) => {
    dispatch(bulkCreateWebhooksFinished({ result: res.data }));
  }, (error) => {
    dispatch(bulkCreateWebhooksFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};

export const refreshWebhooks = (shop, webhooks) => (dispatch) => {
  dispatch(updateWebhooksStarted());
  axios.put(webhooksPath, { shop, webhooks }).then((res) => {
    dispatch(updateWebhooksFinished({ result: res.data }));
  }, (error) => {
    dispatch(updateWebhooksFinished({
      error: error.response.data,
      hasError: true,
    }));
  });
};
