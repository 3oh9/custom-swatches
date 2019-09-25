module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('webhooks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      shopify_webhook_id: {
        type: Sequelize.DECIMAL,
      },
      address: {
        type: Sequelize.STRING(255),
      },
      topic: {
        type: Sequelize.STRING(128),
      },
      format: {
        type: Sequelize.STRING(128),
      },
      api_version: {
        type: Sequelize.STRING(128),
      },
      shop_id: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE, defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE, defaultValue: Sequelize.NOW,
      },
    }, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('webhooks', {}, {});
  },
};
