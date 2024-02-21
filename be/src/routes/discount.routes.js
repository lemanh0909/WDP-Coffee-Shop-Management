import express from 'express';
import { discountController } from '../controller/discount.controller';

const discountRouter = express.Router();

discountRouter.post('/create', discountController.createDiscount);
discountRouter.get('/getAllDiscounts', discountController.getAllDiscounts);
discountRouter.get('/:shopId/getAllDiscountsInShop', discountController.getAllDiscountsInShop);
discountRouter.get('/:discountId/getDiscountById', discountController.getDiscountById);
discountRouter.put('/update', discountController.updateDiscount);
discountRouter.delete('/delete', discountController.deleteDiscount);

export default discountRouter;