import { orderService } from "../services/order.service.js";

export const orderController = {
    createOrder: async (req, res) => {
        try {
            const data = req.body;
            const order = await orderService.createOrder(data);
            res.status(200).json({
                message: 'Success',
                data: {order},
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const order = await orderService.getOrderById(orderId);

            if (!order) {
                return res.status(404).json({
                    message: 'order not found',
                });
            }

            res.status(200).json({
                message: 'Success',
                data: order,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json({
                message: 'Success',
                data: orders,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },
    changeOrderState: async (req, res) => {
        try {
            const data = req.body;
            const orders = await orderService.changeOrderState(data);
            res.status(200).json({
                message: 'Success',
                data: orders,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },
};
