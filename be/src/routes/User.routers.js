// ** Express
import express from "express";

// ** Controllers
import { UserController } from "../controller/User.controller";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";
const userRouter = express.Router();

userRouter.get('/getAll', verifyAdminOrHigherToken, UserController.getAllUser)
userRouter.put('/update', verifyAccessToken, UserController.updateUser)

export default userRouter
