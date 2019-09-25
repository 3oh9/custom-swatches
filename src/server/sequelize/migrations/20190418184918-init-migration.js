module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shops', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(128),
      },
      url: {
        type: Sequelize.STRING(128),
      },
      token: {
        type: Sequelize.STRING(128),
        unique: true,
      },
      webhooks_set: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('shops', {}, {});
  },
};
