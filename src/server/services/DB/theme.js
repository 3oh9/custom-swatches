import request from 'request-promise';

const getThemes = async (shop, token) => {
  const url = `https://${shop}/admin/api/2019-10/themes.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };

  const themesResult = await request.get(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return JSON.parse(themesResult);
};

const getMainTheme = async (shop, token) => {
  const url = `https://${shop}/admin/api/2019-10/themes.json?role=main`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };

  const themeResult = await request.get(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return JSON.parse(themeResult);
};

export default {
  getThemes,
  getMainTheme,
};
