import assetDBService from '../../services/DB/asset';

export const getAssets = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { themeId } = req.params;

  let assetsResponse;

  try {
    assetsResponse = await assetDBService
      .getAssets(shop, token, themeId);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: assetsResponse,
  });
};

export const getAssetByKey = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { themeId, assetFolder, assetKey } = req.params;

  let assetsResponse;

  try {
    assetsResponse = await assetDBService
      .getAssetByKey(shop, token, themeId, assetFolder, assetKey);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: assetsResponse,
  });
};

export const createOrUpdateAsset = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { themeId } = req.params;
  const { asset } = req.body;

  let assetsResponse;

  try {
    assetsResponse = await assetDBService
      .createOrUpdateAsset(shop, token, themeId, asset);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: assetsResponse,
  });
};

export const deleteAsset = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { themeId } = req.params;
  const { key } = req.query;

  let assetsResponse;

  try {
    assetsResponse = await assetDBService
      .deleteAsset(shop, token, themeId, key);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: assetsResponse,
  });
};

export default {
  getAssets,
  getAssetByKey,
  createOrUpdateAsset,
  deleteAsset,
};
