// ** Models

import User from "../models/user";



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
 getAllUsers: async  (page = 1, limit = LIMIT_USER, search) => {
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
}

  
};
