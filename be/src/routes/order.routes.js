import express from 'express';
import { orderController } from '../controller/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/create', orderController.createOrder);
orderRouter.get('/getAllOrders', orderController.getAllOrders);
orderRouter.get('/:shopId/getAllOrdersInShop', orderController.getAllOrdersInShop);
orderRouter.get('/:orderId/getOrderById', orderController.getOrderById);
orderRouter.put('/changeState', orderController.changeOrderState);

export default orderRouter;