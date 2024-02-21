import Category from "../models/category.js";
import Product from "../models/product";
import ProductVariant from "../models/productVariant";
import Shop from "../models/shop.js";

export const productService = {
    createProduct: async ({categoryId, name, description, image }) => {
        const newProduct = new Product({
            name,
            description,
            image,
            productVariant: []
        });
        const category = await Category.findById(categoryId);
        if (category) {
            // Thêm userId vào array trong shop
            category.products.push(newProduct._id);
            // Lưu lại thông tin shop
            await category.save();
        } else {
            throw new Error("Category not found with id: " + categoryId);
        }
        await newProduct.save();
        return newProduct;
    },

    getProductById: async (productId) => {
        return await Product.findById(productId);
    },
    getProductByIdTotalVariant: async (productId) => {
        try {
            // Tìm kiếm sản phẩm theo productId
            const product = await Product.findById(productId);
    
            if (!product) {
                throw new Error(`Product not found with id: ${productId}`);
            }
    
            // Tính tổng số lượng productVariant
            const totalVariants = product.productVariant.length;
    
            // Tạo một bản sao của product và thay thế trường productVariant bằng tổng số lượng
            const productWithTotalVariants = {
                ...product.toObject(),
                productVariant: totalVariants
            };
    
            return productWithTotalVariants;
        } catch (error) {
            console.error('Error in getProductByIdTotalVariant:', error);
            throw error;
        }
    },    
    getAllProducts: async () => {
        return await Product.find();
    },
    getAllProductsInShop: async (shopId) => {
        const shop = await Shop.findById(shopId);;
        if (shop) {
            const categoryIds = shop.categoryId.map(category => category.$oid);
        
            const products = await Product.find({ categoryId: { $in: categoryIds } });
            return products;
        } else {
            throw new Error("Shop not found with id: " + managerId);
        }
    },
    updateProduct: async (productId, {name, description, image }) => {
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
