import searchDBService from '../../services/DB/search';

export const searchProducts = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const {
    limit, title, after, before,
  } = req.body;

  let productsResponse;

  try {
    productsResponse = await searchDBService
      .searchProducts(shop, token, limit, after, before, title);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productsResponse,
  });
};

export const searchProductsRest = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { limit, title } = req.body;

  let productsResponse;

  try {
    productsResponse = await searchDBService
      .searchProductsRest(shop, token, limit, title);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productsResponse,
  });
};

export default {
  searchProducts,
  searchProductsRest,
};
