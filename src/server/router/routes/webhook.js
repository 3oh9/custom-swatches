import { Router } from 'express';
import {
  createWebhook,
  removeWebhook,
  getWebhookList,
  orderPaidHandler,
  orderFulfilledHandler,
  checkoutUpdateHandler,
  bulkCreateWebhookList,
  bulkUpdateWebhookList,
} from '../controllers/webhook';

const router = Router();

router.post('/api/v1/webhook', createWebhook);
router.get('/api/v1/webhook', getWebhookList);
router.post('/api/v1/webhook/bulkcreate', bulkCreateWebhookList);
router.put('/api/v1/webhook/bulkcreate', bulkUpdateWebhookList);
router.delete('/api/v1/webhook/:webhookId', removeWebhook);
router.post('/api/v1/webhook/order/paid', orderPaidHandler);
router.post('/api/v1/webhook/order/fulfilled', orderFulfilledHandler);
router.post('/api/v1/webhook/checkout/update', checkoutUpdateHandler);

export default router;
