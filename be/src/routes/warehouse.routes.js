// ** Express
import express from "express";

// ** Controllers
import { warehouseController } from "../controller/warehouse.controller";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";
const warehouseRouter = express.Router();

warehouseRouter.get('/getAll', verifyAdminOrHigherToken, warehouseController.getAllWarehouses)
warehouseRouter.get('/getDetail', verifyAdminOrHigherToken, warehouseController.getDetailWarehouse)
warehouseRouter.put('/update', verifyAccessToken, warehouseController.updateWarehouse)
warehouseRouter.post('/create',verifyAdminOrHigherToken, warehouseController.createWarehouse)
warehouseRouter.delete('/delete', verifyAccessToken, warehouseController.deleteWarehouse)

