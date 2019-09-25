import configDBService from '../../services/DB/config';

export const saveItem = async (req, res, next) => {
  const { shop } = req.appContext;
  const { setting } = req.body;
  let configResponse;

  try {
    configResponse = await configDBService
      .save(shop, setting);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: configResponse,
  });
};

export const getConfig = async (req, res, next) => {
  const { shop } = req.appContext;
  let configResponse;

  if (!shop) {
    return res.status(500).json({
      success: false,
    });
  }

  try {
    configResponse = await configDBService
      .get(shop);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: configResponse,
  });
};

export default {
  saveItem,
  getConfig,
};
