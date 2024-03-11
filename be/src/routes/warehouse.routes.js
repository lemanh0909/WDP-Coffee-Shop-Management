// ** Express
import express from "express";

// ** Controllers
import { warehouseController } from "../controller/warehouse.controller";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";
const warehouseRouter = express.Router();

// warehouseRouter.get('/getAll', verifyAdminOrHigherToken, warehouseController.getAllWarehouses)
// warehouseRouter.get('/getDetail', verifyAdminOrHigherToken, warehouseController.getDetailWarehouse)
// warehouseRouter.put('/update', verifyAccessToken, warehouseController.updateWarehouse)
// warehouseRouter.post('/create',verifyAdminOrHigherToken, warehouseController.createWarehouse)
// warehouseRouter.delete('/delete', verifyAccessToken, warehouseController.deleteWarehouse)
warehouseRouter.get('/getAll', warehouseController.getAllWarehouses)
warehouseRouter.get('/:id/getDetail', warehouseController.getDetailWarehouse)
warehouseRouter.put('/update', warehouseController.updateWarehouse)
warehouseRouter.post('/create', warehouseController.createWarehouse)
warehouseRouter.delete('/delete', warehouseController.deleteWarehouse)
warehouseRouter.get('/:shopId/getAllWarehousesInShop', warehouseController.getAllWarehousesInShop);

export default warehouseRouter;


