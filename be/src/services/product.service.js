import Category from "../models/category.js";
import Product from "../models/product.js";
import ProductVariant from "../models/productVariant.js";
import Shop from "../models/shop.js";

export const productService = {
    createProduct: async ({ categoryId, name, description, image }) => {
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
    updateProduct: async (productId, { name, description, image }) => {
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

    deleteProduct: async ({ productId }) => {
        const product = await Product.findById(productId);

        if (!product) {
            throw new Error("Product not found with id: " + productId);
        }

        // Xóa tất cả các ProductVariant liên quan
        await ProductVariant.deleteMany({ _id: { $in: product.productVariant } });

        // Xóa Product
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // Tìm tất cả các Category chứa productId này
        const categories = await Category.find({ products: productId });

        // Lặp qua từng Category và xóa productId khỏi mảng products
        categories.forEach(async (category) => {
            const index = category.products.indexOf(productId);
            if (index !== -1) {
                category.products.splice(index, 1);
                await category.save();
            }
        });

        return deletedProduct;
    },


    getAllProductsWithCategoryInShop: async (shopId) => {
        try {
            const shop = await Shop.findById(shopId);

            if (shop) {
                // Lấy danh sách các categoryId từ shop
                const categoryIds = shop.categoryId.map(category => category.$oid);

                // Sử dụng populate để lấy thông tin về sản phẩm và danh mục
                const products = await Product.find({ categoryId: { $in: categoryIds } });
                const categories = await Category.find({ _id: { $in: shop.categoryId } });
                // for (const category of categories) {
                //     for (const productId of category.products){
                //         for (const product of products){
                //             if(product.id === productId.toString()) {
                //                 const object = 
                //             }
                //         }
                //     }
                // }

                // Tạo mảng mới chứa thông tin từ cả sản phẩm và danh mục
                const productsWithCategory = products.map(product => {
                    // Tìm danh mục chứa sản phẩm hiện tại
                    const category = categories.find(cat => cat.products.includes(product._id));

                    // Tạo đối tượng mới chứa thông tin
                    const productWithCategory = {
                        _id: product._id,
                        name: product.name,
                        description: product.description,
                        image: product.image,
                        // Thêm thông tin của danh mục
                        category: {
                            _id: category._id,
                            name: category.name,
                        },
                    };

                    return productWithCategory;
                });
                return productsWithCategory;
            } else {
                throw new Error("Shop not found with id: " + shopId);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },
};
