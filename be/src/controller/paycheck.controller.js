import { paycheckService } from "../services/paycheck.service.js";
import { response } from "../utils/baseResponse.js";
import { httpConstant } from "../constant/index.js";
import { validation } from "../utils/validation.js";

export const paycheckController = {
  createPaycheck: async (req, res) => {
    const error = validation.validationRequest(req, res);
    if (error) return res.status(200).json(error);

    const data = req.body;
    try {
      const paycheck = await paycheckService.createPaycheck(data);
      res.status(200).json({
        message: 'Success',
        data: { paycheck },
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({
        error: error.message,
      });
    }
  },
    getAllpaychecksInShop: async (req, res) => {
      try {
          const managerId = req.params.managerId;
          const paychecks = await paycheckService.getAllPayCheckInShop(managerId);
          res.status(200).json({
              message: 'Success',
              data: paychecks,
          });
      } catch (error) {
          console.error('Error:', error.message);
          res.status(500).json({
              error: error.message,
          });
      }
  },
  changePaycheckState: async (req, res) => {
    try {
        const data = req.body;
        const paycheck = await paycheckService.changePaycheckState(data);
        res.status(200).json({
            message: 'Success',
            data: paycheck,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
},

};
