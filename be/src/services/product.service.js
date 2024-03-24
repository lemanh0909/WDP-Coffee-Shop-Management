import Product from "../models/product.js";
import Shop from "../models/shop.js";
import Category from "../models/category.js";

export const productService = {

    hasDuplicateProductVariant: async (shopId, name, size) => {
        try {
            const shop = await Shop.findById(shopId);

            if (!shop) {
                throw new Error("Shop not found with id: " + shopId);
            }

            // Lấy danh sách các danh mục mà cửa hàng có
            const categoryIds = shop.categoryId;

            // Mảng lưu trữ tất cả các sản phẩm có trong các danh mục của cửa hàng
            let allProducts = [];

            // Lặp qua mỗi danh mục để lấy tất cả sản phẩm
            for (const categoryId of categoryIds) {
                const category = await Category.findById(categoryId);
                if (!category) {
                    console.error("Category not found with id:", categoryId);
                    continue; // Bỏ qua nếu không tìm thấy danh mục
                }

                // Thêm tất cả sản phẩm của danh mục này vào mảng allProducts
                allProducts = allProducts.concat(category.products);
            }

            // Kiểm tra xem có sản phẩm nào có cùng tên và kích thước không
            const duplicateProducts = await Product.find({
                _id: { $in: allProducts }, // Lấy các sản phẩm thuộc danh mục của cửa hàng
                name: name,
                size: size
            });

            return duplicateProducts.length > 0;
        } catch (error) {
            console.error("Error checking duplicate Product:", error);
            throw error;
        }
    },

    createProductVariant: async ({categoryId, name, size, description, price, image, recipe }) => {
        try {
            const shop = await Shop.findOne({ categoryId: categoryId});
            if(!shop) throw new Error("Shop not found with id " + categoryId);
            // Kiểm tra xem Category đã chứa Product có cùng tên và kích thước chưa
            const isDuplicate = await productService.hasDuplicateProductVariant(shop._id, name, size);

            if (isDuplicate) {
                throw new Error("Duplicate Product: There is already a Product with the same name and size in this Category.");
            }

            // Tạo một ProductVariant mới
            const newProductVariant = new Product({
                name,
                description,
                size: size || "M",
                price,
                image: image || [],
                recipe: recipe || [],
            });

            // Lưu ProductVariant vào database
            await newProductVariant.save();

            // Kiểm tra và cập nhật Category
            const category = await Category.findById(categoryId);

            if (category) {
                // Thêm ProductVariant vào mảng productVariant của Product
                category.products.push(newProductVariant);

                // Lưu lại Product
                await category.save();
            } else {
                throw new Error("Category not found with id: " + categoryId);
            }

            return newProductVariant;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    },
    getAllProductVariants: async () => {
        try {
            // Lấy tất cả các ProductVariant từ database
            const allProductVariants = await Product.find();

            return allProductVariants;
        } catch (error) {
            console.error("Error getting all product variants:", error);
            throw error;
        }
    },
    getAllProductVariantsInShop: async (shopId) => {
        try {
            // Lấy tất cả các ProductVariant từ database
            const shop = await Shop.findById(shopId);;
            if (shop) {
                const categoryIds = shop.categoryId.map(category => category);
                
                const categories = await Category.find({ _id: { $in: categoryIds } });
                const allProductIds = categories.map(category => category.products).flat();
                const products = await Product.find({ _id: { $in: allProductIds } });
                return products;
            } else {
                throw new Error("Shop not found with id: " + shopId);
            }
        } catch (error) {
            console.error("Error getting all product variants:", error);
            throw error;
        }
    },
    getProductVariantById: async (productVariantId) => {
        try {
            // Lấy một ProductVariant dựa trên ID từ database
            const productVariant = await Product.findById(productVariantId);

            if (!productVariant) {
                throw new Error("Product not found with id: " + productVariantId);
            }

            return productVariant;
        } catch (error) {
            console.error("Error getting product variant by ID:", error);
            throw error;
        }
    },
    updateProductVariant: async ({ productId, categoryId, name, size, description, price, image, recipe }) => {
        try {
            // Lấy thông tin ProductVariant từ database
            const productVariant = await Product.findById(productId);

            if (!productVariant) {
                throw new Error("Product not found with id: " + productId);
            }
            const shop = await Shop.findOne({categoryId: categoryId})
            if(!shop) throw new Error("Shop not found with category Id: " + categoryId);
            // Kiểm tra xem có sự thay đổi trong tên hoặc kích thước không
            const hasNameOrSizeChanged = name !== undefined && size !== undefined && (name !== productVariant.name || size !== productVariant.size);

            if (hasNameOrSizeChanged) {
                // Kiểm tra xem có ProductVariant khác nào có cùng tên và kích thước không
                const hasDuplicate = await productService.hasDuplicateProductVariant(shop._id, name, size);

                if (hasDuplicate) {
                    throw new Error("Duplicate ProductVariant: There is already a Product with the same name and size in this Shop.");
                }
            }

            // Cập nhật thông tin ProductVariant
            productVariant.name = name || productVariant.name;
            productVariant.size = size || productVariant.size;
            productVariant.description = description || productVariant.description;
            productVariant.price = price || productVariant.price;
            productVariant.image = image || productVariant.image;
            productVariant.recipe = recipe || productVariant.recipe;
            // Lưu lại ProductVariant vào database
            await productVariant.save();

            return productVariant;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    },
    deleteProductVariant: async (productId) => {
        try {
            // Tìm và xóa sản phẩm từ cơ sở dữ liệu
            const product = await Product.findByIdAndDelete(productId);
    
            if (!product) {
                throw new Error("Product not found with id: " + productId);
            }
    
            // Lặp qua tất cả các danh mục có chứa ID sản phẩm và loại bỏ nó
            const categories = await Category.find({ products: productId });
    
            for (const category of categories) {
                const index = category.products.indexOf(productId);
                if (index !== -1) {
                    category.products.splice(index, 1);
                    await category.save();
                }
            }
    
            return {
                status: "OK",
                message: "Product and associated references deleted successfully",
                deletedProduct: product
            };
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    },
    
    getAllProductsWithCategoryInShop: async (shopId) => {
        try {
            // Lấy cửa hàng từ cơ sở dữ liệu
            const shop = await Shop.findById(shopId);
            if (!shop) {
                throw new Error("Shop not found with id: " + shopId);
            }
    
            // Lấy danh sách các danh mục trong cửa hàng
            const categoryIds = shop.categoryId.map(category => category.$oid);
    
            // Lấy tất cả sản phẩm thuộc các danh mục của cửa hàng

    
            // Lấy thông tin chi tiết của từng danh mục
            const categories = await Category.find({ _id: { $in: shop.categoryId } });
            const allProductIds = categories.map(category => category.products).flat();
            const products = await Product.find({ _id: { $in: allProductIds } });
            // Ghép cặp sản phẩm với danh mục tương ứng
            const productsWithCategory = products.map(product => {
                // Tìm danh mục tương ứng cho sản phẩm
                const productCategory = categories.find(category => category.products.includes(product._id));
                // Trả về sản phẩm với thông tin danh mục
                return {
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    size: product.size,
                    price: product.price,
                    image: product.image,
                    recipe: product.recipe,
                    category: {
                        _id: productCategory._id,
                        name: productCategory.name
                    }
                };
            });
    
            return productsWithCategory;
        } catch (error) {
            console.error("Error getting all products with categories:", error);
            throw error;
        }
    },    
};
