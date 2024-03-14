// ** Express
import express from "express";

// ** Controllers
import { CategoryController } from "../controller/category.controller.js";

// ** Middleware
import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt.js";

const categoryRouter = express.Router();

// categoryRouter.get('/getAll', verifyAccessToken, CategoryController.getAllCategories);
// categoryRouter.get('/getDetail', verifyAccessToken, CategoryController.getCategoryDetail);
// categoryRouter.put('/update', verifyAdminOrHigherToken, CategoryController.updateCategory);
// categoryRouter.post('/create', verifyAdminOrHigherToken, CategoryController.createCategory);
// categoryRouter.delete('/delete', verifyAdminOrHigherToken, CategoryController.deleteCategory);
categoryRouter.get('/getAll', CategoryController.getAllCategories);
categoryRouter.get('/:id/getDetail', CategoryController.getCategoryDetail);
categoryRouter.get('/:shopId/getAllCategoriesInShop', CategoryController.getAllCategoriesInShop);
categoryRouter.put('/:id/update', CategoryController.updateCategory);
categoryRouter.post('/create', CategoryController.createCategory);
categoryRouter.delete('/delete', CategoryController.deleteCategory);


export default categoryRouter;
