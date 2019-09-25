import { Router } from 'express';
import { getThemes, getMainTheme } from '../controllers/theme';

const router = Router();

router.get('/api/v1/themes', getThemes);
router.get('/api/v1/themes/main', getMainTheme);

export default router;
