import { warehouseService } from "../services/index.js";
import { response } from "../utils/baseResponse.js";
import { httpConstant } from "../constant/index.js";
import { validation } from "../utils/validation.js";

const LIMIT_WAREHOUSE = 10;

export const warehouseController = {
  createWarehouse: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const data = req.body;
    try {
      const warehouse = await warehouseService.createWarehouse(data);
      res.status(200).json(
        response.success({
          data: { warehouse },
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

  updateWarehouse: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;
    const data = req.body;

    try {
      const result = await warehouseService.updateWarehouse(id, data);

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

  getDetailWarehouse: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;

    try {
      const warehouse = await warehouseService.getDetailWarehouse(id);

      res.status(200).json(
        response.success({
          data: warehouse,
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

  getAllWarehouses: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { page, limit, search } = req.query;

    try {
      const result = await warehouseService.getAllWarehouses(
        page || 1,
        limit || LIMIT_WAREHOUSE,
        search || ""
      );

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

  deleteWarehouse: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const { id } = req.params;

    try {
      const result = await warehouseService.deleteWarehouse(id);

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
  getAllWarehousesInShop: async (req, res) => {
    try {
        const shopId = req.params.shopId;
        const warehouse = await warehouseService.getAllWarehousesInShop(shopId);
        res.status(200).json({
            message: 'Success',
            data: warehouse,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
},
};
