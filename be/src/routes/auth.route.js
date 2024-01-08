const router = require('express').Router();
const AuthController=require("../controllers/auth.controller")

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logoutUser);

module.exports = router;
