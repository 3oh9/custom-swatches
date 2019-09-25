import { Router } from 'express';
import {
  gdprCustomerRedact,
  gdprShopRedact,
  gdprCustomerDadaRequest,
} from '../controllers/gdpr';

const router = Router();

router.post('/api/v1/gdpr/customers/redact', gdprCustomerRedact);
router.post('/api/v1/gdpr/shop/redact', gdprShopRedact);
router.post('/api/v1/gdpr/customers/data_request', gdprCustomerDadaRequest);

export default router;
