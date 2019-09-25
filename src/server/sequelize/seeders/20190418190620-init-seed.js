module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('shops', [{
      url: 'ruleapp.myshopify.com',
      name: 'ruleapp',
      token: '33652c9845f01bcc5b43f4234f5380ae',
      webhooks_set: true,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },
};
