import productDBService from '../../services/DB/product';

export const getProducts = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { limit, pageInfo } = req.body;

  let productsResponse;

  try {
    productsResponse = await productDBService
      .getProducts(shop, token, limit, pageInfo);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productsResponse,
  });
};

export const getProduct = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { productId } = req.params;

  let productsResponse;

  try {
    productsResponse = await productDBService
      .getProduct(shop, token, productId);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productsResponse,
  });
};

export const updateProduct = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { productId } = req.params;
  const { product } = req.body;

  let productResponse;

  try {
    productResponse = await productDBService
      .updateProduct(shop, token, productId, product);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productResponse,
  });
};

export const getProductMetafields = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { productId } = req.params;

  let productMetafieldsResponse;

  try {
    productMetafieldsResponse = await productDBService
      .getProductMetafields(shop, token, productId);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productMetafieldsResponse,
  });
};

export const createProductMetafield = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { productId } = req.params;
  const { metafield } = req.body;

  let productMetafieldsResponse;

  try {
    productMetafieldsResponse = await productDBService
      .createProductMetafield(shop, token, productId, metafield);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productMetafieldsResponse,
  });
};

export const deleteProductMetafield = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { productId, metafieldId } = req.params;

  let productMetafieldsResponse;

  try {
    productMetafieldsResponse = await productDBService
      .deleteProductMetafield(shop, token, productId, metafieldId);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productMetafieldsResponse,
  });
};

export const getGqlProducts = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const {
    limit, after, before,
  } = req.body;

  let productsResponse;

  try {
    productsResponse = await productDBService
      .getGqlProducts(shop, token, limit, after, before);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: productsResponse,
  });
};

export default {
  getProducts,
  getProduct,
  getProductMetafields,
  createProductMetafield,
  deleteProductMetafield,
  getGqlProducts,
};
