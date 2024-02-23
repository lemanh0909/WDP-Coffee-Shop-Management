// ** Models

import User from "../models/user.js";
import Shop from "../models/shop.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// ** Constants
import { authConstant } from "../constant/index.js";

export const userService = {
    getUserById: async ({ userId }) => {
        return await User.findOne({ _id: userId });
    },
    updateUser: async (_id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, phoneNumber, fullName, dob } = data
                const user = await User.findOne({
                    _id
                })
                    .populate('_id')
                    .populate({
                        path: '_id',
                        populate: {
                            path: 'role'
                        }
                    })

                if (user === null) {
                    resolve({
                        status: 'ERR',
                        message: `The user is not defined `
                    })
                }
                const userUpdate = {
                    ...user._doc,
                    email,
                    phoneNumber, fullName, dob
                }
                await User.findByIdAndUpdate(user._id, userUpdate, { new: true })
                userUpdate._id.password = "******";
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: userUpdate
                })
            } catch (err) {
                reject(err)
            }
        })
    },
    getAllUsers: async (page = 1, limit = LIMIT_USER, search) => {
        return new Promise(async (resolve, reject) => {
            try {
                var skipNumber = (page - 1) * limit;
                const conditions = {
                    $or: [
                        { email: { $regex: search, $options: 'i' } },
                        { phoneNumber: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                    ]
                };
                const searchQuery = search ? conditions : null;
                const totalUser = await User.count(searchQuery)
                const allUser = await User.find(searchQuery)
                    .skip(skipNumber)
                    .limit(limit)
                    .populate('_id')
                    .populate({
                        path: '_id',
                        populate: {
                            path: 'role'
                        }
                    })
                const newAllUser = allUser.map((user) => {
                    const newUser = { ...user._doc };
                    if (newUser._id) {
                        newUser._id.password = '******'
                    }
                    return newUser;
                })
                resolve({
                    status: 'OK',
                    data: newAllUser,
                    totalUser,
                    currentPage: parseInt(page),
                    limit: parseInt(limit)
                })
            } catch (err) {
                reject(err)
            }
        })
    },
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
    staffAuthorization: async ({ staffId, status }) => {
        try {
            const staff = await User.findById(staffId);
            if (!staff) throw new Error('Staff not found for the given Staff Id');
            staff.status = status;
            // Lưu cập nhật vào cơ sở dữ liệu
            await staff.save();

            // Trả về staff sau khi cập nhật
            return staff;
        } catch (error) {
            console.error('Error in staffAuthorization:', error);
            throw error;
        }
    },
    createStaff: async ({ managerId, email, password, fullName, dob, phoneNumber, description, salary }) => {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error(authConstant.EMAIL_EXISTED);
            const newUser = new User({
                email,
                password,
                fullName,
                dob: dob || '',
                phoneNumber: phoneNumber || '',
                role: "Staff",
                description: description || "",
                salary: salary || 0,
            });
            const salt = bcrypt.genSaltSync();
            newUser.password = bcrypt.hashSync(newUser.password, salt);

            // Tim kiem shop
            const shop = await Shop.findOne({ managerId });
            if (shop) {
                // Thêm userId vào array trong shop
                shop.staffId.push(newUser._id);
                // Lưu lại thông tin shop
                await shop.save();
            } else {
                throw new Error("Shop not found with managerId: " + managerId);
            }
            newUser.save();
            // Trả về staff sau khi cập nhật
            return newUser;
        } catch (error) {
            console.error('Error in staffAuthorization:', error);
            throw error;
        }
    },
};
