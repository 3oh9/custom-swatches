import { Router } from 'express';
import {
  getAssets,
  getAssetByKey,
  createOrUpdateAsset,
  deleteAsset,
} from '../controllers/asset';

const router = Router();

router.get('/api/v1/themes/:themeId/assets', getAssets);
router.get('/api/v1/themes/:themeId/assets/:assetFolder/:assetKey', getAssetByKey);
router.put('/api/v1/themes/:themeId/assets', createOrUpdateAsset);
router.delete('/api/v1/themes/:themeId/assets', deleteAsset);

export default router;
