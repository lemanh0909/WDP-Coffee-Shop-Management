import ProductVariant from "../models/productVariant";
import Product from "../models/product";
import Shop from "../models/shop.js";

export const ProductVariantService = {

    hasDuplicateProductVariant: async (productId, name, size) => {
        try {
            const product = await Product.findById(productId);

            if (!product) {
                throw new Error("Product not found with id: " + productId);
            }

            // Kiểm tra xem có ProductVariant nào có cùng tên và size không
            const hasDuplicate = product.productVariant.some(
                (variant) => variant.name === name && variant.size === size
            );

            return hasDuplicate;
        } catch (error) {
            console.error("Error checking duplicate ProductVariant:", error);
            throw error;
        }
    },

    createProductVariant: async ({ productId, name, size, description, price, image, recipe }) => {
        try {
            // Kiểm tra xem Product đã chứa ProductVariant có cùng tên và kích thước chưa
            const isDuplicate = await ProductVariantService.hasDuplicateProductVariant(productId, name, size);

            if (isDuplicate) {
                throw new Error("Duplicate ProductVariant: There is already a ProductVariant with the same name and size in this Product.");
            }

            // Tạo một ProductVariant mới
            const newProductVariant = new ProductVariant({
                name,
                description,
                size: size || "M",
                price,
                image: image || [],
                recipe: recipe || [],
            });

            // Lưu ProductVariant vào database
            await newProductVariant.save();

            // Kiểm tra và cập nhật Product
            if (productId) {
                const product = await Product.findById(productId);

                if (product) {
                    // Thêm ProductVariant vào mảng productVariant của Product
                    product.productVariant.push(newProductVariant);

                    // Lưu lại Product
                    await product.save();
                } else {
                    throw new Error("Product not found with id: " + productId);
                }
            } else {
                throw new Error("Invalid productId: " + productId);
            }

            return newProductVariant;
        } catch (error) {
            console.error("Error creating product variant:", error);
            throw error;
        }
    },
    getAllProductVariants: async () => {
        try {
            // Lấy tất cả các ProductVariant từ database
            const allProductVariants = await ProductVariant.find();

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
                const categoryIds = shop.categoryId.map(category => category.$oid);

                const products = await Product.find({ categoryId: { $in: categoryIds } });
                

                    const productVariant = products.map(variant =>
                        variant.productVariant
                    );
                    const variantIds = []
                   for (const product of productVariant) {
                    for (const variant of product){
                        variantIds.push(variant._id);
                    }
                   }
                // // Bước 2: Lấy tất cả các ProductVariant dựa trên danh sách IDs
                const productVariants = await ProductVariant.find({ _id: { $in: variantIds } });


                return productVariants;
            } else {
                throw new Error("Shop not found with id: " + managerId);
            }
        } catch (error) {
            console.error("Error getting all product variants:", error);
            throw error;
        }
    },
    getProductVariantById: async (productVariantId) => {
        try {
            // Lấy một ProductVariant dựa trên ID từ database
            const productVariant = await ProductVariant.findById(productVariantId);

            if (!productVariant) {
                throw new Error("ProductVariant not found with id: " + productVariantId);
            }

            return productVariant;
        } catch (error) {
            console.error("Error getting product variant by ID:", error);
            throw error;
        }
    },
    updateProductVariant: async ({ productId, productVariantId, name, size, description, price, image, recipe }) => {
        try {
            // Lấy thông tin ProductVariant từ database
            const productVariant = await ProductVariant.findById(productVariantId);

            if (!productVariant) {
                throw new Error("ProductVariant not found with id: " + variantId);
            }

            // Kiểm tra xem có sự thay đổi trong tên hoặc kích thước không
            const hasNameOrSizeChanged = name !== undefined && size !== undefined && (name !== productVariant.name || size !== productVariant.size);

            if (hasNameOrSizeChanged) {
                // Kiểm tra xem có ProductVariant khác nào có cùng tên và kích thước không
                const hasDuplicate = await ProductVariantService.hasDuplicateProductVariant(productId, name, size);

                if (hasDuplicate) {
                    throw new Error("Duplicate ProductVariant: There is already a ProductVariant with the same name and size in this Product.");
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
            console.error("Error updating product variant:", error);
            throw error;
        }
    },
    deleteProductVariant: async ({ productId, productVariantId }) => {
        try {
            // Kiểm tra xem Product và ProductVariant có tồn tại không
            const product = await Product.findById(productId);
            const productVariant = await ProductVariant.findById(productVariantId);

            if (!product || !productVariant) {
                throw new Error("Product or ProductVariant not found");
            }

            // Lọc ra danh sách các ProductVariant khác ProductVariant cần xóa
            const updatedVariants = product.productVariant.filter(
                (variant) => variant._id.toString() !== productVariantId
            );

            // Kiểm tra xem ProductVariant cần xóa có tồn tại trong danh sách hay không
            if (updatedVariants.length === product.productVariant.length) {
                throw new Error("ProductVariant not found in the specified Product");
            }

            // Cập nhật danh sách ProductVariant trong Product
            product.productVariant = updatedVariants;

            // Lưu lại Product
            await product.save();

            // Xóa ProductVariant từ database
            await ProductVariant.findByIdAndDelete(productVariantId);

            return { message: "ProductVariant deleted successfully" };
        } catch (error) {
            console.error("Error deleting product variant:", error);
            throw error;
        }
    },
};
