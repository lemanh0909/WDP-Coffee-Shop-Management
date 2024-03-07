import express from 'express';
import { productController } from '../controller/product.controller.js';

const productRouter = express.Router();

productRouter.post('/create', productController.createProduct);
productRouter.get('/getAllProducts', productController.getAllProducts);
productRouter.get('/:managerId/getAllProductsInShop', productController.getAllProductsInShop);
productRouter.get('/:productId/getProductById', productController.getProductById);
productRouter.get('/:productId/getProductByIdTotalVariant', productController.getProductByIdTotalVariant);
productRouter.put('/:productId/update', productController.updateProduct);
productRouter.delete('/delete', productController.deleteProduct);

export default productRouter;