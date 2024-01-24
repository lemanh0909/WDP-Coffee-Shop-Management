// ** Express
import express from "express";

// ** Controllers
import { managerController } from "../controller/manager.controller.js";

// ** Constants
import { authConstant, userConstant } from "../constant";

// ** Middlewares
import { body } from "express-validator";
import { verifyAccessToken, verifyRefreshToken } from "../middleware/jwt";

const managerRouter = express.Router();

managerRouter.get(
  "/:id/list_staff",
  managerController.getAllStaff
);

managerRouter.put(
  "/:id/list_staff",
  managerController.staffAuthorization
);

export default managerRouter