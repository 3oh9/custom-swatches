import request from 'request-promise';
import crypto from 'crypto';
import querystring from 'querystring';

import models from '../../sequelize/models';

const getShopResponse = async (shopRequestUrl, shopRequestHeaders, shop) => {
  await request.get(shopRequestUrl, { headers: shopRequestHeaders }).catch((err) => {
    throw err;
  });
};

const getTokenResponse = async (accessTokenRequestUrl, accessTokenPayload, shop) => {
  const accessTokenResponse = await request.post(
    accessTokenRequestUrl,
    { json: accessTokenPayload },
  ).catch((err) => {
    throw err;
  });

  const accessToken = accessTokenResponse.access_token;

  try {
    const currentShop = await models.Shop.findOne({
      where: {
        url: shop,
      },
    }).catch((err) => {
      throw err;
    });

    if (currentShop) {
      await models.Shop.update({
        url: shop,
        token: accessToken,
        name: shop.replace('.myshopify.com', ''),
        active: true,
      }, {
        where: {
          id: currentShop.get('id'),
        },
      }).catch((err) => {
        throw err;
      });
    } else {
      await models.Shop.create({
        url: shop,
        token: accessToken,
        name: shop.replace('.myshopify.com', ''),
        active: true,
      }).catch((err) => {
        throw err;
      });
    }
  } catch (err) {
    throw err;
  }

  const shopRequestUrl = `https://${shop}/admin/shop.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': accessToken,
  };

  await getShopResponse(shopRequestUrl, shopRequestHeaders);
};

const getShopifyCallback = async (shop, hmac, code, apiSecret, apikey, query) => {
  const map = Object.assign({}, query);
  delete map.signature;
  delete map.hmac;
  const message = querystring.stringify(map);
  const providedHmac = Buffer.from(hmac, 'utf-8');
  const generatedHash = Buffer.from(
    crypto
      .createHmac('sha256', apiSecret)
      .update(message)
      .digest('hex'),
    'utf-8',
  );
  let hashEquals = false;

  try {
    hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
  } catch (e) {
    hashEquals = false;
  }

  if (!hashEquals) {
    throw 'HMAC validation failed';
  }

  const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
  const accessTokenPayload = {
    client_id: apikey,
    client_secret: apiSecret,
    code,
  };

  const result = await getTokenResponse(accessTokenRequestUrl, accessTokenPayload, shop);

  return result;
};

const getShop = async (shop) => {
  const currentShop = await models.Shop.findOne({
    where: { url: shop },
    attributes: {
      exclude: ['token'],
    },
  }).catch((err) => {
    throw err;
  });

  return currentShop;
};

const getShopWithToken = async (shop) => {
  const currentShop = await models.Shop.findOne({
    where: { url: shop },
  }).catch((err) => {
    throw err;
  });

  return currentShop;
};

export default {
  getShopifyCallback,
  getShop,
  getShopWithToken,
};
