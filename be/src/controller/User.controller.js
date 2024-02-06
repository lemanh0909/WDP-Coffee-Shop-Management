

// ** Services
import { userService } from "../services";



// ** Utils
import { validationResult } from "express-validator";

export const UserController = {
    getAllUser: async (req, res) => {
        try {
            const { page, limit, search } = req.query
            const response = await userService.getAllUsers(page, limit, search)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                status: 'ERR',
                message: error.message
            })
        }
      },
  
  
    updateUser : async (req, res) => {
        const userId = req.user.id;
        try {
            if (!userId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await userService.updateUser(userId, req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                status: 'ERR',
                message: error.message
            })
        }
    }
};
