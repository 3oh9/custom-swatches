import config from './config';

export default [
  {
    webhook: {
      topic: 'checkouts/update',
      address: `${config.apiPath}/webhook/checkout/update`,
      format: 'json',
    },
  }, {
    webhook: {
      topic: 'orders/paid',
      address: `${config.apiPath}/webhook/order/paid`,
      format: 'json',
    },
  }, {
    webhook: {
      topic: 'orders/fulfilled',
      address: `${config.apiPath}/webhook/order/fulfilled`,
      format: 'json',
    },
  }, {
    webhook: {
      topic: 'app/uninstalled',
      address: `${config.apiPath}/app/uninstalled`,
      format: 'json',
    },
  },
];
