import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';

const db = {};
let sequelize;

const initSequelize = () => {
  if (!db.hasOwnProperty()) {
    sequelize = new Sequelize({ ...config, supportBigNumbers: true });
    Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
      date = this._applyTimezone(date, options);
      return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    };

    fs.readdirSync(__dirname)
      .filter(file => (file.indexOf('.') !== 0) && (!file.includes('index')) && (!file.includes('.map')))
      .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
      });

    Object.keys(db).forEach((modelName) => {
      if ('associate' in db[modelName]) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  }
};

initSequelize();

export default db;
