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
<<<<<<< HEAD
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    try {
      const managerId = req.params.managerId;
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
=======
    try {
        const shopId = req.params.shopId;
        const categories = await categoryService.getAllCategoriesInShop(shopId);
        res.status(200).json({
            message: 'Success',
            data: categories,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
},
>>>>>>> 1b2986056825d589e96c8716449bdff42565021d

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
