import express from 'express';
import { orderController } from '../controller/order.controller';

const orderRouter = express.Router();

orderRouter.post('/create', orderController.createOrder);
orderRouter.get('/getAllOrders', orderController.getAllOrders);
orderRouter.get('/getOrderById', orderController.getOrderById);
orderRouter.put('/changeState', orderController.changeOrderState);

export default orderRouter;