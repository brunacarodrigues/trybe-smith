import express from 'express';
import productController from '../controllers/product.controller';
import productMiddleware from '../middleware/product.middleware';

const productRoute = express();
const { validateProduct, validatePrice } = productMiddleware;

productRoute.post('/', validateProduct, validatePrice, productController.createProduct);
productRoute.get('/', productController.getAllProducts);

export default productRoute;