import { discountService } from "../services/discount.service";

export const discountController = {
    createDiscount: async (req, res) => {
        try {
            const data = req.body;
            const discount = await discountService.createDiscount(data);

            res.status(200).json({
                message: 'Success',
                data: discount,
            });
        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    getAllDiscounts: async (req, res) => {
        try {
            const allDiscounts = await discountService.getAllDiscounts();
            res.status(200).json({
                message: 'Success',
                data: allDiscounts,
            });
        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    getDiscountById: async (req, res) => {
        try {
            const discountId = req.params.discountId;
            const discount = await discountService.getDiscountById(discountId);

            res.status(200).json({
                message: 'Success',
                data: discount,
            });
        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    updateDiscount: async (req, res) => {
        try {
            const data = req.body;
            const updatedDiscount = await discountService.updateDiscount(data);

            res.status(200).json({
                message: 'Success',
                data: updatedDiscount,
            });
        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    deleteDiscount: async (req, res) => {
        try {
            const data = req.body;
            const deletedDiscount = await discountService.deleteDiscount(data);

            res.status(200).json({
                message: 'Success',
                data: deletedDiscount,
            });
        } catch (error) {
            console.error('Error', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },
};
