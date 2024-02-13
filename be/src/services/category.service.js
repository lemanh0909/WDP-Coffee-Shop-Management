import Category from '../models/category';

export const categoryService = {
  createCategory: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, description, products } = data;

        const checkCategoryExists = await Category.findOne({ name });

        if (checkCategoryExists) {
          resolve({
            status: 'ERR',
            message: 'Category already exists!',
          });
        }

        const createdCategory = await Category.create({ name, description, products });

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
