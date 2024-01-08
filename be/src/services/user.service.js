// @ts-ignore
const User=require('../models/user')
const bcrypt=require('bcrypt');

class UserService {

    async getAll() {
        try {
            const result =await User.find();
            return result;
        } catch (error) {
            throw error;
        }
    }
    async deleteOne(req,res) {
        const id=req.params.id;
        try {
            const result =await User.findById(id);
            // const result =await User.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new UserService();
