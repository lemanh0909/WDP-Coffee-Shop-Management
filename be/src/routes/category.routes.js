// ** Express
import express from "express";

// ** Controllers
import { CategoryController } from "../controller/category.controller";

// ** Middleware
import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";

const categoryRouter = express.Router();

categoryRouter.get('/getAll', verifyAccessToken, CategoryController.getAllCategories);
categoryRouter.get('/getDetail', verifyAccessToken, CategoryController.getCategoryDetail);
categoryRouter.put('/update', verifyAdminOrHigherToken, CategoryController.updateCategory);
categoryRouter.post('/create', verifyAdminOrHigherToken, CategoryController.createCategory);
categoryRouter.delete('/delete', verifyAdminOrHigherToken, CategoryController.deleteCategory);

export default categoryRouter;
