import express from 'express';
import { productController } from '../controller/product.controller.js';

const productRouter = express.Router();

productRouter.get("/getAllVariants", productController.getAllProductVariants);
productRouter.get("/:productVariantId/getProductVariant", productController.getProductVariantById);
productRouter.get("/:shopId/getAllProductVariantsInShop", productController.getAllProductVariantsInShop);
productRouter.put("/updateVariant", productController.updateProductVariant)
productRouter.post('/create', productController.createProductVariant);
productRouter.delete('/:productId/delete', productController.deleteProductVariant);
productRouter.get('/:shopId/getAllProductsWithCategoryInShop', productController.getAllProductsWithCategoryInShop);


export default productRouter;