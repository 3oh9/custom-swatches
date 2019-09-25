import { Router } from 'express';
import { saveItem, getConfig } from '../controllers/config';

const router = Router();

router.post('/api/v1/config', saveItem);
router.get('/api/v1/config', getConfig);

export default router;
