const asyncHandler = require('../utils/async-handler');
// const { errorResponse, successResponse } = require('../utils/response');
const UserService = require("../services/user.service")
module.exports = {

    getAllUsers: asyncHandler(async (req, res) => {
        try {
            const user = await UserService.getAll();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    deleteOneUser: asyncHandler(async (req, res) => {
        try {
            const user = await UserService.deleteOne(req,res);
            if(user){
                return res.status(200).json("Delete Successfully!");
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
};
