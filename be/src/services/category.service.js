import Category from '../models/category.js';
import Shop from '../models/shop.js';
export const categoryService = {
  createCategory: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {managerId, name, description, products } = data;

        const checkCategoryExists = await Category.findOne({ name });

        if (checkCategoryExists) {
          resolve({
            status: 'ERR',
            message: 'Category already exists!',
          });
        }

        const createdCategory = await Category.create({ name, description, products });
        const shop = await Shop.findOne({ managerId });
        if (shop) {
            // Thêm userId vào array trong shop
            shop.categoryId.push(createdCategory._id);
            // Lưu lại thông tin shop
            await shop.save();
        } else {
            throw new Error("Shop not found with managerId: " + managerId);
        }
        resolve({
          status: 'OK',
          message: 'Category created successfully',
          data: createdCategory,
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  updateCategory: async (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkCategoryExists = await Category.findById(id);

        if (!checkCategoryExists) {
          resolve({
            status: 'ERR',
            message: 'Category does not exist!',
          });
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });

        resolve({
          status: 'OK',
          message: 'Category updated successfully',
          data: updatedCategory,
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  updateCategoryBasis: async (id, { name, description, products }) => {
    try {
        const category = await Category.findById(id);

        if (!category) {
            throw new Error(`category not found with id: ${id}`);
        }

        category.name = name !== undefined ? name : category.name;
        category.description = description !== undefined ? description : category.description;
        category.products = products !== undefined ? products : category.products;

        await category.save();
        return category;
    } catch (error) {
        throw new Error(`Error updating category basis: ${error.message}`);
    }
},

  getCategoryDetail: async (categoryId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Category.findById(categoryId);

        if (!category) {
          resolve({
            status: 'ERR',
            message: 'Category not found',
          });
        }

        resolve({
          status: 'OK',
          message: 'Category retrieved successfully',
          data: category,
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  getAllCategories: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allCategories = await Category.find();

        resolve({
          status: 'OK',
          message: 'Categories retrieved successfully',
          data: allCategories,
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  getAllCategoriesInShop: async (managerId) => {
    try {
      // Tìm kiếm cửa hàng dựa trên managerId
      const shop = await Shop.findOne({ managerId: managerId }).populate('categoryId')
      // Kiểm tra nếu không tìm thấy cửa hàng
      if (shop==null) {
        throw new Error('Shop not found with managerId:'+managerId);
      }
  
      // Lấy ra tất cả các danh mục liên kết với cửa hàng
      const categories = shop.categoryId;
  
      // Trả về kết quả thành công
      return {
        status: 'OK',
        message: 'Categories retrieved successfully',
        data: categories,
      };
    } catch (err) {
      // Xử lý lỗi
      console.error('Error retrieving categories:', err);
      throw new Error('Error retrieving categories: ' + err.message);
    }
  },

  deleteCategory: async (categoryId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
          resolve({
            status: 'ERR',
            message: 'Category not found',
          });
        }

        resolve({
          status: 'OK',
          message: 'Category deleted successfully',
          data: category,
        });
      } catch (err) {
        reject(err);
      }
    });
  },
};
