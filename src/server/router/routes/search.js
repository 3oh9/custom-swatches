import { Router } from 'express';
import { searchProducts, searchProductsRest } from '../controllers/search';

const router = Router();

router.post('/api/v1/gql/search/products', searchProducts);
router.post('/api/v1/search/products', searchProductsRest);

export default router;
