import { productService } from "../services/product.service";

export const productController = {
    createProduct: async (req, res) => {
        try {
            const data = req.body;
            const product = await productService.createProduct(data);
            res.status(200).json({
                message: 'Success',
                data: {product},
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    getProductById: async (req, res) => {
        try {
            const data = req.body;
            const product = await productService.getProductById(data);

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                });
            }

            res.status(200).json({
                message: 'Success',
                data: product,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
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

    updateProduct: async (req, res) => {
        try {
            const data = req.body;
            const updatedProduct = await productService.updateProduct(data);

            res.status(201).json({
                message: 'Success',
                data: updatedProduct,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const data = req.body;
            const deletedProduct = await productService.deleteProduct(data);

            res.status(200).json({
                message: 'Success',
                data: deletedProduct,
            });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({
                error: error.message,
            });
        }
    }
};
