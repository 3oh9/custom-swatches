module.exports = {
  up: async (queryInterface, Sequelize) => ([
    await queryInterface.addColumn(
      'shops',
      'active',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    ),
  ]),

  down: async queryInterface => ([
    await queryInterface.removeColumn(
      'shops',
      'active',
    ),
  ]),
};
