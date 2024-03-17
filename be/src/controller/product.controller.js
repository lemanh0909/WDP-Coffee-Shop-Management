import { productService } from "../services/product.service.js";

export const productController = {
    createProductVariant: async (req, res) => {
        try {
            const data = req.body;

            const newProductVariant = await productService.createProductVariant(data)

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
            const allProductVariants = await productService.getAllProductVariants();

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
    getAllProductVariantsInShop: async (req, res) => {
        // const error = validation.validationRequest(req, res);
        // if (error) return res.status(200).json(error);

        try {
            const shopId = req.params.shopId;
            const allProductVariants = await productService.getAllProductVariantsInShop(shopId);

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
            const productVariant = await productService.getProductVariantById(productVariantId);

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
            const productVariant = await productService.updateProductVariant(data);

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

        const {productId} = req.params;

        try {
            const productVariant = await productService.deleteProductVariant(productId);

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
    getAllProductsWithCategoryInShop: async (req, res) => {
        try {
            const shopId = req.params.shopId;
            const products = await productService.getAllProductsWithCategoryInShop(shopId);
            res.status(200).json({
                message: 'Success',
                data: products,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },
};
