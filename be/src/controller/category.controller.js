import { categoryService } from "../services/index.js";
import { response } from "../utils/baseResponse.js";
import { httpConstant } from "../constant/index.js";
import { validation } from "../utils/validation.js";

export const CategoryController = {
  createCategory: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const data = req.body;
    try {
      const category = await categoryService.createCategory(data);
      res.status(200).json(
        response.success({
          data: { category },
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },

  updateCategoryBasis: async (req, res) => {
    try {
      const categoryId = req.params._id;
      const data = req.body;

      if (!categoryId) {
        return res.status(400).json({
          error: 'Invalid categoryId provided',
        });
      }

      const updateCategoryBasis = await categoryService.updateCategoryBasis(categoryId, data);

      res.status(201).json({
        message: 'Success',
        data: updateCategoryBasis,
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({
        error: error.message,
      });
    }
  },

  updateCategory: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;
    const data = req.body;

    try {
      const result = await categoryService.updateCategory(id, data);

      res.status(200).json(
        response.success({
          data: result,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },

  getCategoryDetail: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;

    try {
      const category = await categoryService.getCategoryDetail(id);

      res.status(200).json(
        response.success({
          data: category,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },

  getAllCategories: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    try {
      const result = await categoryService.getAllCategories();

      res.status(200).json(
        response.success({
          data: result,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },

  getAllCategoriesInShop: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    try {
      const managerId = req.params.managerId;
      console.log(managerId);
      const result = await categoryService.getAllCategoriesInShop(managerId);

      res.status(200).json(
        response.success({
          data: result,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: err.message,
        })
      );
    }
  },

  deleteCategory: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;

    try {
      const result = await categoryService.deleteCategory(id);

      res.status(200).json(
        response.success({
          data: result,
        })
      );
    } catch (err) {
      res.status(200).json(
        response.error({
          code: 500,
          message: httpConstant.SERVER_ERROR,
        })
      );
    }
  },
};
