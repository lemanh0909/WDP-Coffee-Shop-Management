// ** Express
import express from "express";

// ** Controllers
import { UserController } from "../controller/User.controller";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";
const userRouter = express.Router();

userRouter.get('/getAll', verifyAdminOrHigherToken, UserController.getAllUser);
userRouter.put('/update', verifyAccessToken, UserController.updateUser);
userRouter.get('/getStaffList', UserController.getStaffList);
userRouter.put('/staffAuthorization', UserController.staffAuthorization);
userRouter.post('/createStaff', UserController.createStaff);

export default userRouter
