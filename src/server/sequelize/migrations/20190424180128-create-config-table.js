module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('configs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING(128),
        allowNull: false,
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
    await queryInterface.dropTable('configs', {}, {});
  },
};
