import express from 'express';
import productController from '../controllers/product.controller';

const productRoute = express();

productRoute.post('/', productController.createProduct);

export default productRoute;