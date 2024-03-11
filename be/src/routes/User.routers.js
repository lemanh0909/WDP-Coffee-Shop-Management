// ** Express
import express from "express";

// ** Controllers
import { UserController } from "../controller/User.controller.js";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt.js";
const userRouter = express.Router();

userRouter.get('/getAll', verifyAdminOrHigherToken, UserController.getAllUser);
userRouter.put('/update', verifyAccessToken, UserController.updateUser);
userRouter.get('/:managerId/getStaffList', UserController.getStaffList);
userRouter.put('/staffAuthorization', UserController.staffAuthorization);
userRouter.put('/managerAuthorization', UserController.managerAuthorization);
userRouter.post('/createStaff', UserController.createStaff);

export default userRouter
