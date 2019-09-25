import request from 'request-promise';
import config from '../../utils/config';
import models from '../../sequelize/models';

const customerRedact = async (email, shop) => {
  const { apiPath } = config;
  const result = `Subscriber with email - ${email} was successfully deleted from ...`;

  const currentShop = await models.Shop.findOne({
    where: { url: shop },
  }).catch((err) => {
    throw err;
  });

  return result;
};

const shopRedact = async (currentShop) => {
  const result = `Shop ${currentShop.url} was successfully deleted from Swatches`;

  return result;
};

const customerDadaRequest = async (shop, email) => {
  const { apiPath } = config;

  const currentShop = await models.Shop.findOne({
    where: { url: shop },
  }).catch((err) => {
    throw err;
  });

  const result = {
    currentShop,
  };

  return result;
};

export default {
  customerRedact,
  shopRedact,
  customerDadaRequest,
};
