import request from 'request-promise';
import moment from 'moment-timezone';

import config from '../../utils/config';
import models from '../../sequelize/models';

const createWebhook = async (shop, token, webhook) => {
  const url = `https://${shop}/admin/api/2020-04/webhooks.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const webhookResult = await request.post(
    url,
    { headers: shopRequestHeaders, json: { webhook } },
  ).catch((err) => {
    throw err;
  });

  if (webhookResult) {
    const currentShop = await models.Shop.findOne({
      where: { url: shop },
    }).catch((err) => {
      throw err;
    });

    await models.Webhook.create({
      shopifyWebhookId: webhookResult.webhook.id,
      address: webhookResult.webhook.address,
      apiVersion: webhookResult.webhook.api_version,
      format: webhookResult.webhook.format,
      topic: webhookResult.webhook.topic,
      shopId: currentShop.id,
    }).catch((err) => {
      throw err;
    });

    await currentShop.update({
      webhooksSet: true,
    }).catch((err) => {
      throw err;
    });
  }

  return webhookResult;
};

const bulkCreateWebhook = async (shop, token, webhooks) => {
  const url = `https://${shop}/admin/api/2020-04/webhooks.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const webhookTotalResult = [];

  await webhooks.forEach(async (item) => {
    const currentShop = await models.Shop.findOne({
      where: { url: shop },
    }).catch((err) => {
      throw err;
    });

    const webhookResult = await request.post(
      url,
      { headers: shopRequestHeaders, json: { webhook: item.webhook } },
    ).catch((err) => {
      throw err;
    });

    await models.Webhook.create({
      shopifyWebhookId: webhookResult.webhook.id,
      address: webhookResult.webhook.address,
      apiVersion: webhookResult.webhook.api_version,
      format: webhookResult.webhook.format,
      topic: webhookResult.webhook.topic,
      shopId: currentShop.id,
    }).catch((err) => {
      throw err;
    });

    await currentShop.update({
      webhooksSet: true,
    }).catch((err) => {
      throw err;
    });

    await webhookTotalResult.push(webhookResult);
  });

  return webhookTotalResult;
};

const removeWebhook = async (shop, token, webhookId) => {
  const url = `https://${shop}/admin/api/2020-04/webhooks/${webhookId}.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const webhookResult = await request.delete(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  await models.Webhook.destroy({
    where: { shopifyWebhookId: webhookId },
  }).catch((err) => {
    throw err;
  });

  return webhookResult;
};

const bulkRemoveWebhook = async (shop, token, webhooks) => {
  const url = webhookId => `https://${shop}/admin/api/2020-04/webhooks/${webhookId}.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  let result = false;

  if (webhooks) {
    const currentShop = await models.Shop.findOne({
      where: { url: shop, token },
    }).catch((err) => {
      throw err;
    });

    const payload = await webhooks.webhooks.map(async (webhook) => {
      await request.delete(
        url(webhook.id),
        { headers: shopRequestHeaders },
      ).catch((err) => {
        throw err;
      });

      await models.Webhook.destroy({
        where: {
          shopifyWebhookId: webhook.id,
          shopId: currentShop.id,
        },
      }).catch((err) => {
        throw err;
      });
    });

    await Promise.all(payload).then(() => {
      result = true;
    }, (error) => {
      throw error;
    });
  }

  return result;
};


const bulkRemoveShopWebhooks = async (shop, token) => {
  let result;
  const currentShop = await models.Shop.findOne({
    where: { url: shop, token },
  }).catch((err) => {
    throw err;
  });

  const shopWebhooks = await models.Webhook.findAll({
    where: { shopId: currentShop.id },
  }).catch((err) => {
    throw err;
  });

  const payload = await shopWebhooks.map(async (item) => {
    const webhook = item.get({ plain: true });
    const removed = await models.Webhook.destroy({
      where: {
        shopifyWebhookId: webhook.shopifyWebhookId,
        shopId: currentShop.id,
      },
    }).catch((err) => {
      throw err;
    });

    return removed;
  });

  await Promise.all(payload).then(() => {
    result = true;
  }, (error) => {
    throw error;
  });

  return result;
};

const getWebhookList = async (shop, token) => {
  const url = `https://${shop}/admin/api/2020-04/webhooks.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const webhookResult = await request.get(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return JSON.parse(webhookResult);
};

const orderPaidWebhook = async (payload, shop) => {
  const { customer } = payload;
  let webhookResult;

  const currentShop = await models.Shop.findOne({
    where: { url: shop },
  }).catch((err) => {
    throw err;
  });

  return webhookResult;
};

const orderFulfilledWebhook = async (payload, shop) => {
  const { customer } = payload;
  let webhookResult;

  const currentShop = await models.Shop.findOne({
    where: { url: shop },
  }).catch((err) => {
    throw err;
  });

  return webhookResult;
};

const checkoutUpdateWebhook = async (payload, shop) => {
  const { customer } = payload;
  let webhookResult = null;

  const currentShop = await models.Shop.findOne({
    where: { url: shop },
  }).catch((err) => {
    throw err;
  });

  return webhookResult;
};

export default {
  createWebhook,
  removeWebhook,
  getWebhookList,
  orderPaidWebhook,
  orderFulfilledWebhook,
  checkoutUpdateWebhook,
  bulkCreateWebhook,
  bulkRemoveWebhook,
  bulkRemoveShopWebhooks,
};
