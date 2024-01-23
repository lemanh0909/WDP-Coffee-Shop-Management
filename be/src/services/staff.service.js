// ** Models
import User from "../models/User.js";
import Account from "../models/account.js";
import Shop from "../models/shop.js";

// ** Service
import { jwtService } from "../utils/jwt.js";

// ** Third Libs
import bcrypt from "bcrypt";
import crypto from "crypto";

// ** Constants
import { authConstant } from "../constant/index.js";

// import { transporter } from "../config/nodemailer";

export const staffService = {
    getStaffList: async (managerId) => {
        try {
            // Tìm cửa hàng với managerId tương ứng
            const shop = await Shop.findOne({ managerId });
            if (!shop) {
                throw new Error('Shop not found for the given managerId');
            }

            // Lấy danh sách nhân viên từ mảng staffId của cửa hàng
            const staffList = await User.find({ _id: { $in: shop.staffId } });

            return staffList;
        } catch (error) {
            console.error('Error in getStaffList:', error);
            throw error;
        }
    },
    staffAuthorization: async (staffId) => {
        try {
            const staff = await User.findById(staffId);
            if (!staff) throw new Error('Staff not found for the given Staff Id');
            staff.isVerified = true;
            // Lưu cập nhật vào cơ sở dữ liệu
            await staff.save();

            // Trả về staff sau khi cập nhật
            return staff;
        } catch (error) {
            console.error('Error in staffAuthorization:', error);
            throw error;
        }
    },
};
