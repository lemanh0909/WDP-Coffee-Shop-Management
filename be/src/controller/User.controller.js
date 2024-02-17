

// ** Services
import { userService } from "../services/User.service.js";


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
    },
    getStaffList : async (req, res) => {
        const data = req.body;
        try {
            if (!data) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The managerId is required'
                })
            }
            const response = await userService.getStaffList(data);
            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                status: 'ERR',
                message: error.message
            })
        }
    },
    staffAuthorization : async (req, res) => {
        const data = req.body;
        try {
            const response = await userService.staffAuthorization(data);
            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                status: 'ERR',
                message: error.message
            })
        }
    },
    createStaff: async (req, res) => {
        const data = req.body;
        try {
            const response = await userService.createStaff(data);
            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                status: 'ERR',
                message: error.message
            })
        }
    },
};
