module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Config', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: 'name',
    },
    value: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: 'value',
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'shop_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tableName: 'configs',
  });

  Config.associate = (models) => {
    Config.belongsTo(models.Shop, {
      foreignKey: 'shopId',
      constraints: false,
      as: 'shop',
    });
  };

  return Config;
};
