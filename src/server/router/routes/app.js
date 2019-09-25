import { Router } from 'express';
import { uninstallApp } from '../controllers/app';

const router = Router();

router.post('/api/v1/app/uninstalled', uninstallApp);

export default router;
