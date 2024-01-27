// ** Service
import { staffService } from "../services/index.js";

// ** Base Response
import { response } from "../utils/baseResponse.js";

// ** Constants
import { authConstant, httpConstant, userConstant } from "../constant/index.js";

// ** Validator
import { validation } from "../utils/validation.js";




export const managerController = {
  getAllStaff: async (req, res) => {
    const error = validation.validationRequest(req, res);

    if (error) return res.status(200).json(error);

    const managerId = req.params.id;
    try {
      const staffList = await staffService.getStaffList(managerId);
      res.status(200).json(
        response.success({
          data: { staffList },
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
  staffAuthorization: async (req, res) => {
    const error = validation.validationRequest(req, res);

    if (error) return res.status(200).json(error);

    const staffId = req.body.staffId;
    try {
      const staff = await staffService.staffAuthorization(staffId);
      res.status(200).json(
        response.success({
          data: { staff },
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
