import fetch from 'node-fetch';
import GraphQLClient from 'graphql-js-client';
import typeBundle from './types';
import models from '../sequelize/models';

global.fetch = fetch;

export const getClient = async (shop) => {
  const currentShop = await models.Shop.findOne({
    where: { url: shop },
  });
  const config = await models.Config.findOne({
    where: { shopId: currentShop.id, name: 'storefrontToken' },
  });

  return new GraphQLClient(typeBundle, {
    url: `https://${currentShop.get('url')}/api/graphql`,
    fetcherOptions: {
      headers: {
        'X-Shopify-Storefront-Access-Token': `${config.value}`,
      },
    },
  });
};

export default {
  getClient,
};
