// ** Express
import express from "express";

// ** Controllers
import { warehouseController } from "../controller/warehouse.controller.js";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt.js";
const warehouseRouter = express.Router();

// warehouseRouter.get('/getAll', verifyAdminOrHigherToken, warehouseController.getAllWarehouses)
// warehouseRouter.get('/getDetail', verifyAdminOrHigherToken, warehouseController.getDetailWarehouse)
// warehouseRouter.put('/update', verifyAccessToken, warehouseController.updateWarehouse)
// warehouseRouter.post('/create',verifyAdminOrHigherToken, warehouseController.createWarehouse)
// warehouseRouter.delete('/delete', verifyAccessToken, warehouseController.deleteWarehouse)
warehouseRouter.get('/getAll', warehouseController.getAllWarehouses)
warehouseRouter.get('/:id/getDetail', warehouseController.getDetailWarehouse)
warehouseRouter.put('/update', warehouseController.updateWarehouse)
warehouseRouter.put('/:_id/updateBasis', warehouseController.updateWarehouseBasis);
warehouseRouter.post('/create', warehouseController.createWarehouse)
warehouseRouter.delete('/:warehouseId/delete', warehouseController.deleteWarehouse)
warehouseRouter.get('/:shopId/getAllWarehousesInShop', warehouseController.getAllWarehousesInShop);

export default warehouseRouter;


