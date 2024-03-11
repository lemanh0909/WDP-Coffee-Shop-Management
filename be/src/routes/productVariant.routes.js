import express from 'express';
import { productVariantController } from '../controller/productVariant.controller.js';

const productVariantRouter = express.Router();

productVariantRouter.get("/getAllVariants", productVariantController.getAllProductVariants);
productVariantRouter.get("/:productVariantId/getProductVariant", productVariantController.getProductVariantById);
productVariantRouter.get("/:shopId/getAllProductVariantsInShop", productVariantController.getAllProductVariantsInShop);
productVariantRouter.put("/updateVariant", productVariantController.updateProductVariant)
productVariantRouter.post('/create', productVariantController.createProductVariant);
productVariantRouter.delete('/delete', productVariantController.deleteProductVariant);


export default productVariantRouter;