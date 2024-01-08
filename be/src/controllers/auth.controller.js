const asyncHandler = require('../utils/async-handler');
const AuthService=require("../services/auth.service");


module.exports = {

    registerUser: asyncHandler(async (req, res) => {
        const  user= await AuthService.registerUser(req,res);
        return res.status(200).json(user);
    }),
    loginUser: asyncHandler(async (req, res) => {
        const user = await AuthService.loginUser(req, res);
        return res.status(200).json(user);
    }),

    refreshToken:asyncHandler(async (req, res) => {
        const user = await AuthService.refreshAccessToken(req, res);
        return res.status(200).json(user);
    }),

    logoutUser:asyncHandler(async (req, res) => {
        const user = await AuthService.logoutUser(req, res);
        return res.status(200).json(user);
    }),
    
    
};
