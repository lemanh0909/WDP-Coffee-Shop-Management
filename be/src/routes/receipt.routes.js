// ** Express
import express from "express";

// ** Controllers
import { receiptController } from "../controller/receipt.controller";

// ** Middleware
import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";

const receiptRouter = express.Router();

// categoryRouter.get('/getAll', verifyAccessToken, CategoryController.getAllCategories);
// categoryRouter.get('/getDetail', verifyAccessToken, CategoryController.getCategoryDetail);
// categoryRouter.put('/update', verifyAdminOrHigherToken, CategoryController.updateCategory);
// categoryRouter.post('/create', verifyAdminOrHigherToken, CategoryController.createCategory);
// categoryRouter.delete('/delete', verifyAdminOrHigherToken, CategoryController.deleteCategory);
receiptRouter.get('/getAll', receiptController.getAllReceipt);
receiptRouter.post('/create', receiptController.createReceipt);


export default receiptRouter;
