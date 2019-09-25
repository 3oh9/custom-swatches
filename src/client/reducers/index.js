import { combineReducers } from 'redux';
import shop from './shop';
import config from './config';
import webhook from './webhook';
import product from './product';
import theme from './theme';
import asset from './asset';
import imageCrop from './imageCrop';

export default combineReducers({
  shop,
  config,
  webhook,
  product,
  theme,
  asset,
  imageCrop,
});

