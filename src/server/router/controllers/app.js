import appDBService from '../../services/DB/app';
import webhookDBService from '../../services/DB/webhook';
import shopDBService from '../../services/DB/shop';

export const uninstallApp = async (req, res, next) => {
  const payload = req.body;
  const shopDomain = payload.myshopify_domain;
  let uninstallResponse;

  try {
    const currentShop = await shopDBService
      .getShopWithToken(shopDomain);

    await webhookDBService
      .bulkRemoveShopWebhooks(currentShop.url, currentShop.token);

    uninstallResponse = await appDBService
      .uninstall(shopDomain);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: uninstallResponse,
  });
};

export default {
  uninstallApp,
};
