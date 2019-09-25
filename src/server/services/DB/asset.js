import request from 'request-promise';

const getAssets = async (shop, token, themeId) => {
  const url = `https://${shop}/admin/api/2019-10/themes/${themeId}/assets.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };

  const assetsResult = await request.get(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return JSON.parse(assetsResult);
};

const getAssetByKey = async (shop, token, themeId, assetFolder, assetKey) => {
  const url = `https://${shop}/admin/api/2019-10/themes/${themeId}/assets.json?asset[key]=${assetFolder}/${assetKey}&theme_id=${themeId}`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };

  const assetsResult = await request.get(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return JSON.parse(assetsResult);
};

const createOrUpdateAsset = async (shop, token, themeId, asset) => {
  const url = `https://${shop}/admin/api/2019-10/themes/${themeId}/assets.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };

  const assetsResult = await request.put(
    url,
    {
      headers: shopRequestHeaders,
      json: { asset },
    },
  ).catch((err) => {
    throw err;
  });

  return assetsResult;
};

const deleteAsset = async (shop, token, themeId, key) => {
  const url = `https://${shop}/admin/api/2019-10/themes/${themeId}/assets.json?asset[key]=${key}`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };

  const assetsResult = await request.delete(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return assetsResult;
};

export default {
  getAssets,
  getAssetByKey,
  createOrUpdateAsset,
  deleteAsset,
};
