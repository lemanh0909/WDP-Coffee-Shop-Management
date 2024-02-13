import Product from "../models/product";
import ProductVariant from "../models/productVariant";

export const productService = {
    createProduct: async ({ name, description, image }) => {
        const newProduct = new Product({
            name,
            description,
            image,
            productVariant: []
        });

        await newProduct.save();
        return newProduct;
    },

    getProductById: async ({productId}) => {
        return await Product.findById(productId);
    },

    getAllProducts: async () => {
        return await Product.find();
    },

    updateProduct: async ({productId, name, description, image }) => {
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found with id: " + productId);
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.image = image || product.image;

        await product.save();
        return product;
    },

    deleteProduct: async ({productId}) => {
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found with id: " + productId);
        }

        // Xóa tất cả các ProductVariant liên quan
        await ProductVariant.deleteMany({ _id: { $in: product.productVariant } });

        // Xóa Product
        const deletedProduct = await Product.findByIdAndDelete(productId);
        
        return deletedProduct;
    }
};
