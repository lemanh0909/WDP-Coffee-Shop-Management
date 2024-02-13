// ** Express
import express from "express";

// ** Controllers
import  {WarehouseController}  from "../controller/warehouse.controller";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";
const warehouseRouter = express.Router();

warehouseRouter.get('/getAll', verifyAdminOrHigherToken, WarehouseController.getAllWarehouses)
warehouseRouter.get('/getDetail', verifyAdminOrHigherToken, WarehouseController.getDetailWarehouse)
warehouseRouter.put('/update', verifyAccessToken, WarehouseController.updateWarehouse)
warehouseRouter.post('/create',verifyAdminOrHigherToken, WarehouseController.createWarehouse)
warehouseRouter.delete('/delete', verifyAccessToken, WarehouseController.deleteWarehouse)

export default warehouseRouter;

export default warehouseRouter;

