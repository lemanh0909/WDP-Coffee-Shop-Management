// ** Express
import express from "express";

// ** Controllers
import { UserController } from "../controller/User.controller.js";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt.js";
const userRouter = express.Router();

userRouter.get('/getAll', verifyAdminOrHigherToken, UserController.getAllUser);
userRouter.put('/:id/update',  UserController.updateUser);
userRouter.get('/:managerId/getStaffList', UserController.getStaffList);
userRouter.put('/staffAuthorization', UserController.staffAuthorization);
userRouter.put('/managerAuthorization', UserController.managerAuthorization);
userRouter.post('/createStaff', UserController.createStaff);
userRouter.get('/getManagerList', UserController.getManagerList);
userRouter.get('/:id/getDetail', UserController.getDetailUser);

export default userRouter