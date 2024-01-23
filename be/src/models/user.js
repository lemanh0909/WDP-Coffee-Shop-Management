import mongoose from "mongoose";

const { String, Date, Number, Boolean, ObjectId } = mongoose.Schema.Types;

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account', // Liên kết với mô hình Account
        required: true,
      },
      email: {
        type: String,
        required: true,
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
      password: {
        type: String,
        default: "123456",
      },
      refreshToken: {
        type: String,
        default: null,
      },
      description: {
        type: String,
      },
      salary: {
        type: Number,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        enum: ["Manager", "Staff"],
        default: "user",
      },
      isDelete: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);

export default User;
