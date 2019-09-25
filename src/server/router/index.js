import express from 'express';
import shop from './routes/shop';
import webhook from './routes/webhook';
import config from './routes/config';
import app from './routes/app';
import gdpr from './routes/gdpr';
import product from './routes/product';
import search from './routes/search';
import theme from './routes/theme';
import asset from './routes/asset';

const router = express.Router();
router.use(shop);
router.use(webhook);
router.use(config);
router.use(app);
router.use(gdpr);
router.use(product);
router.use(search);
router.use(theme);
router.use(asset);

export default router;
