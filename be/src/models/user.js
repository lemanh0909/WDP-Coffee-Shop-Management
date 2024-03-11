import mongoose from "mongoose";

const { String, Date, Number, Boolean, ObjectId } = mongoose.Schema.Types;

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: {
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
      email: {
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
      fullName: {
        type: String,
        required: true,
      },
      dob: {
        type: Date,
      },
      phoneNumber: {
        type: String,
      },
      refreshToken: {
        type: String,
        default: null,
      },
      role: {
        type: String,
        enum: ["Manager", "Staff", "Admin"],
        default: "user",
      },
      description: {
        type: String,
      },
      salary: {
        type: Number,
      },
      status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
      },
    },
    { timestamps: true }
  )
);

export default User;