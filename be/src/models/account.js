import mongoose from "mongoose";

const Account = mongoose.model(
    'Account',
    new mongoose.Schema(
        {
            email:{
                type: String,
                required: true,
                minlength: 10,
                maxlength: 50,
            },
            password: {
                type: String,
                required: true,
                minlength: 6,
            },
            verificationCode: {
                type: String,
            },
            isVerified: {
                type: Boolean
            },
        },
        {timestamps: true},
    )
);

export default Account