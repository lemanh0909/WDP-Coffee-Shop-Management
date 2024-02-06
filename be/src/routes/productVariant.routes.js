import express from 'express';
import { productVariantController } from '../controller/productVariant.controller';

const productVariantRouter = express.Router();

productVariantRouter.get("/getAllVariants", productVariantController.getAllProductVariants);
productVariantRouter.get("/getProductVariant", productVariantController.getProductVariantById);
productVariantRouter.put("/updateVariant", productVariantController.updateProductVariant)
productVariantRouter.post('/create', productVariantController.createProductVariant);
productVariantRouter.delete('/delete', productVariantController.deleteProductVariant);


export default productVariantRouter;