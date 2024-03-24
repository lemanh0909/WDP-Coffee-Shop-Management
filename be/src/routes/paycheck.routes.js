// ** Express
import express from "express";

// ** Controllers
import { paycheckController } from "../controller/paycheck.controller.js";

// ** Middleware
import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt.js";

const paycheckRouter = express.Router();

// paycheckRouter.get('/getAll', paycheckController.getAllpaycheck);
paycheckRouter.post('/create', paycheckController.createPaycheck);
paycheckRouter.get('/:managerId/getAllpaychecksInShop', paycheckController.getAllpaychecksInShop);
paycheckRouter.put('/changeState', paycheckController.changePaycheckState);


export default paycheckRouter;
