import { financeService } from "../services/index.js";
import { response } from "../utils/baseResponse.js";
import { httpConstant } from "../constant/index.js";
import { validation } from "../utils/validation.js";



export const financeController = {


    getAllFinance: async (req, res) => {
        const error = validation.validationRequest(req, res);
        if (error) return res.status(200).json(error);
    
        try {
          const result = await financeService.getAllFinance();
    
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
