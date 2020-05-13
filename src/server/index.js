import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import router from './router';
import shopAuth from './router/middlewares/auth';

const app = express();
const engines = require('consolidate');

app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(shopAuth);
app.use(router);

app.use((err, req, res, next) => {
  if (err) {
    console.log('Error', err);
  }
  if (!err) {
    next();
  }
  const { message } = err;
  res.status(500).json({ message });
});

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(express.static(__dirname + './../../'));
app.use(express.static(__dirname + '/views'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(process.env.PORT || 8080);
