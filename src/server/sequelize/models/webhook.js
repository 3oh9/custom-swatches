module.exports = (sequelize, DataTypes) => {
  const Webhook = sequelize.define('Webhook', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    shopifyWebhookId: {
      type: DataTypes.DECIMAL,
      field: 'shopify_webhook_id',
      allowNull: false,
    },
    address: DataTypes.STRING(255),
    topic: DataTypes.STRING(128),
    format: DataTypes.STRING(128),
    apiVersion: {
      type: DataTypes.STRING(128),
      field: 'api_version',
    },
    shopId: {
      type: DataTypes.INTEGER,
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
    tableName: 'webhooks',
  });

  Webhook.associate = (models) => {
    Webhook.belongsTo(models.Shop, {
      foreignKey: 'shopId',
      as: 'shopOwner',
    });
  };

  return Webhook;
};
