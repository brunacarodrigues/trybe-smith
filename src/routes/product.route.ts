import express from 'express';
import productController from '../controllers/product.controller';

const productRoute = express();

productRoute.post('/', productController.createProduct);
productRoute.get('/', productController.getAllProducts);

export default productRoute;