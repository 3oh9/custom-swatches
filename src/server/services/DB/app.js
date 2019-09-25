import models from '../../sequelize/models';

const uninstall = async (shop) => {
  const updatedShop = await models.Shop.update(
    { active: false, webhooksSet: false },
    { where: { url: shop } },
  ).catch((err) => {
    throw err;
  });

  return updatedShop;
};

export default {
  uninstall,
};
