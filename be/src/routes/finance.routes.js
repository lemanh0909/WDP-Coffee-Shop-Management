// ** Express
import express from "express";

// ** Controllers
import { financeController } from "../controller/finance.controller";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";
const financeRouter = express.Router();

// warehouseRouter.get('/getAll', verifyAdminOrHigherToken, warehouseController.getAllWarehouses)
// warehouseRouter.get('/getDetail', verifyAdminOrHigherToken, warehouseController.getDetailWarehouse)
// warehouseRouter.put('/update', verifyAccessToken, warehouseController.updateWarehouse)
// warehouseRouter.post('/create',verifyAdminOrHigherToken, warehouseController.createWarehouse)
// warehouseRouter.delete('/delete', verifyAccessToken, warehouseController.deleteWarehouse)
financeRouter.get('/getAll', financeController.getAllFinance)


export default financeRouter;


