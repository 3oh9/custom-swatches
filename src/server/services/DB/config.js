import models from '../../sequelize/models';

const save = async (shop, setting) => {
  let result;
  const shopByName = await models.Shop.findOne({
    where: { url: shop },
  }).catch((err) => {
    throw err;
  });

  const configItem = await models.Config.findOne({
    where: { name: setting.name, shopId: shopByName.id },
  }).catch((err) => {
    throw err;
  });

  if (configItem) {
    result = await configItem.update({
      value: setting.value,
      where: { name: setting.name, shopId: shopByName.id },
    }).catch((err) => {
      throw err;
    });
  } else {
    result = await models.Config.create({
      ...setting,
      shopId: shopByName.id,
    }).catch((err) => {
      throw err;
    });
  }

  return result;
};

const get = async (shop) => {
  const shopByName = await models.Shop.findOne({
    where: { url: shop },
  }).catch((err) => {
    throw err;
  });
  const configResult = await models.Config.findAll({
    where: { shopId: shopByName.id },
  }).catch((err) => {
    throw err;
  });

  return configResult;
};

export default {
  save,
  get,
};
