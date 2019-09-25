import request from 'request-promise';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

import { getProducts as getProductsQuery } from '../../query/productQuery';

const includeHeaders = (body, response, resolveWithFullResponse) => (
  { headers: response.headers, data: body }
);

const getProducts = async (shop, token, limit = 50, pageInfo = '') => {
  const url = `https://${shop}/admin/api/2019-10/products.json?limit=${limit}&page_info=${pageInfo}`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const paginationLinks = {
    next: '',
    prev: '',
  };

  const options = {
    method: 'GET',
    uri: url,
    json: true,
    transform: includeHeaders,
    headers: shopRequestHeaders,
  };

  const productResult = await request.get(options)
    .catch((err) => {
      throw err;
    });

  if (productResult.headers.link) {
    productResult.headers.link.split(',').forEach((link) => {
      const object = {
        href: '',
        rel: '',
        token: '',
      };

      const tempParts = link.split('; ');
      const hrefPart = tempParts[0];
      const relPart = tempParts[1];
      const tokenPart = hrefPart.split('page_info=').pop();

      object.href = hrefPart.substr(1, hrefPart.indexOf('>'));
      object.rel = relPart.split('="')[1].substr(0, relPart.indexOf('"'));
      object.token = tokenPart.substr(0, tokenPart.indexOf('>'));

      paginationLinks[object.rel] = object;
    });
  }

  const result = {
    products: productResult.data.products,
    prev: paginationLinks.prev,
    next: paginationLinks.next,
  };

  return result;
};

const getProduct = async (shop, token, productId) => {
  const url = `https://${shop}/admin/api/2019-10/products/${productId}.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const productResult = await request.get(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return JSON.parse(productResult);
};

const updateProduct = async (shop, token, productId, product) => {
  const url = `https://${shop}/admin/api/2019-10/products/${productId}.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const productResult = await request.put(
    url,
    { headers: shopRequestHeaders, json: { product } },
  ).catch((err) => {
    throw err;
  });

  return JSON.parse(productResult);
};

const getProductMetafields = async (shop, token, productId) => {
  const url = `https://${shop}/admin/api/2019-10/products/${productId}/metafields.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };
  const productMetafieldsResult = await request.get(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return JSON.parse(productMetafieldsResult);
};

const createProductMetafield = async (shop, token, productId, metafield) => {
  const url = `https://${shop}/admin/api/2019-10/products/${productId}/metafields.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };

  const productMetafieldsResult = await request.post(
    url,
    { headers: shopRequestHeaders, json: { metafield } },
  ).catch((err) => {
    throw err;
  });

  return productMetafieldsResult;
};

const deleteProductMetafield = async (shop, token, productId, metafieldId) => {
  const url = `https://${shop}/admin/api/2019-10/products/${productId}/metafields/${metafieldId}.json`;
  const shopRequestHeaders = {
    'X-Shopify-Access-Token': token,
  };

  const productMetafieldsResult = await request.delete(
    url,
    { headers: shopRequestHeaders },
  ).catch((err) => {
    throw err;
  });

  return productMetafieldsResult;
};

const getGqlProducts = async (currentShopUrl, token, limit, after, before) => {
  let productsResponse;

  const query = getProductsQuery(limit, after, before);

  const httpLink = createHttpLink({
    uri: `https://${currentShopUrl}/admin/api/2019-07/graphql.json`,
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    const result = {
      headers: {
        ...headers,
        'X-Shopify-Access-Token': token,
      },
    };
    return result;
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  await client.query({
    query,
  })
    .then((data) => {
      productsResponse = data;
    })
    .catch((error) => {
      throw error;
    });

  return productsResponse;
};

export default {
  getProducts,
  getProduct,
  updateProduct,
  getProductMetafields,
  createProductMetafield,
  deleteProductMetafield,
  getGqlProducts,
};
