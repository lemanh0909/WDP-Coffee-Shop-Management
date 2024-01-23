// ** Express
import express from "express";

// ** Controllers
import { UserController } from "../controller/User.controller";


// ** Validation

import { verifyAccessToken, verifyAdminOrHigherToken } from "../middleware/jwt";


router.get('/getAll', verifyAdminOrHigherToken, UserController.getAllUser)
router.put('/update', verifyAccessToken, UserController.updateUser)

module.exports = router