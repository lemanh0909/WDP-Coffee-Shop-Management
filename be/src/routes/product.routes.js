import express from 'express';
import { productController } from '../controller/product.controller';

const productRouter = express.Router();

productRouter.post('/create', productController.createProduct);
productRouter.get('/getAllProducts', productController.getAllProducts);
productRouter.get('/getProductById', productController.getProductById);
productRouter.put('/update', productController.updateProduct);
productRouter.delete('/delete', productController.deleteProduct);

export default productRouter;