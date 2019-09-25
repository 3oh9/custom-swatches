import { Router } from 'express';
import {
  getProduct,
  getProducts,
  updateProduct,
  getProductMetafields,
  createProductMetafield,
  deleteProductMetafield,
  getGqlProducts,
} from '../controllers/product';

const router = Router();

router.post('/api/v1/products', getProducts);
router.post('/api/v1/gql/products', getGqlProducts);
router.post('/api/v1/products/:productId', getProduct);
router.put('/api/v1/products/:productId', updateProduct);
router.get('/api/v1/products/:productId/metafields', getProductMetafields);
router.post('/api/v1/products/:productId/metafields', createProductMetafield);
router.delete('/api/v1/products/:productId/metafields/:metafieldId', deleteProductMetafield);

export default router;
