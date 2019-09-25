module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING(128),
    url: DataTypes.STRING(128),
    token: DataTypes.STRING(128),
    webhooksSet: {
      field: 'webhooks_set',
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      field: 'active',
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: 'shops',
  });

  Shop.associate = (models) => {
    Shop.hasMany(models.Webhook, {
      foreignKey: 'shopId',
      as: 'webhook',
    });
    Shop.hasMany(models.Config, {
      foreignKey: 'shopId',
      as: 'shop',
    });
  };

  return Shop;
};
