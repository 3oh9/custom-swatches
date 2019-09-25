import { Router } from 'express';
import { generateShopifyCallback, shopifyInstall, getShopInfo } from '../controllers/shop';

const router = Router();

router.get('/api/v1/auth/callback', generateShopifyCallback);
router.get('/api/v1/auth', shopifyInstall);
router.get('/api/v1/shop', getShopInfo);

export default router;
