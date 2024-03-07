import { ProductVariantService } from "../services/productVariant.service.js";

export const productVariantController = {
    createProductVariant: async (req, res) => {
        try {
            const data = req.body;

            const newProductVariant = await ProductVariantService.createProductVariant(data)

            res.status(201).json({
                success: true,
                data: { productVariant: newProductVariant },
            });
        } catch (error) {
            console.error("Error creating product variant:", error);
            res.status(500).json({
                success: false,
                error: { error: error.message },
            });
        }
    },
    getAllProductVariants: async (req, res) => {
        // const error = validation.validationRequest(req, res);
        // if (error) return res.status(200).json(error);

        try {
            const allProductVariants = await ProductVariantService.getAllProductVariants();

            res.status(200).json({
                success: true,
                data: { allProductVariants: allProductVariants },
            });
        } catch (error) {
            console.error("Error creating product variant:", error);
            res.status(500).json({
                success: false,
                error: { error: error.message },
            });
        }
    },
    getProductVariantById: async (req, res) => {
        // const error = validation.validationRequest(req, res);
        // if (error) return res.status(200).json(error);

        const productVariantId = req.params.productVariantId;

        try {
            const productVariant = await ProductVariantService.getProductVariantById(productVariantId);

            res.status(200).json({
                success: true,
                data: { productVariant: productVariant },
            });
        } catch (error) {
            console.error("Error creating product variant:", error);
            res.status(500).json({
                success: false,
                error: { error: error.message },
            });
        }
    },
    updateProductVariant: async (req, res) => {
        // const error = validation.validationRequest(req, res);
        // if (error) return res.status(200).json(error);

        const data = req.body;

        try {
            const productVariant = await ProductVariantService.updateProductVariant(data);

            res.status(201).json({
                success: true,
                data: { productVariant: productVariant },
            });
        } catch (error) {
            console.error("Error updating product variant:", error);
            res.status(500).json({
                success: false,
                error: { error: error.message },
            });
        }
    },
    deleteProductVariant: async (req, res) => {
        // const error = validation.validationRequest(req, res);
        // if (error) return res.status(200).json(error);

        const data = req.body;

        try {
            const productVariant = await ProductVariantService.deleteProductVariant(data);

            res.status(200).json({
                success: true,
                data: { productVariant: productVariant },
            });
        } catch (error) {
            console.error("Error deleting product variant:", error);
            res.status(500).json({
                success: false,
                error: { error: error.message },
            });
        }
    },

};
