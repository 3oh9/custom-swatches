import models from '../../sequelize/models';

export default (req, res, next) => {
  let reqShop = '';
  switch (req.method) {
    case 'GET':
      reqShop = req.body && req.body.shop ? req.body.shop : req.query.shop;
      break;
    case 'POST':
      reqShop = req.body && req.body ? req.body.shop : null;
      break;
    case 'PUT':
      reqShop = req.body && req.body ? req.body.shop : null;
      break;
    case 'DELETE':
      reqShop = req.query ? req.query.shop : null;
      break;
    default: reqShop = req.body.shop;
  }

  req.appContext = {
    shop: null,
    token: null,
  };

  if (reqShop) {
    try {
      models.Shop.findOne({ where: { url: reqShop } }).then((shop) => {
        if (shop) {
          req.appContext = {
            shop: shop.get('url'),
            token: shop.get('token'),
          };
          next();
        } else {
          next();
        }
      })
        .catch((err) => {
          console.error('Unable to connect to the database:', err);
          next(err);
        });
    } catch (err) {
      console.log('Shop not found', err);
      next(err);
    }
  } else {
    next();
    // res.status(500).json({
    //   success: false,
    //   result: 'Parameter not found - shop',
    // });
  }

  if (reqShop && reqShop !== 'undefined') {
    res.cookie('shop', reqShop);
  }
};
