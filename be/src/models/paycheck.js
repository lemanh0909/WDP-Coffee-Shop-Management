import mongoose from "mongoose";
import User from "./user";

const { String, Number, ObjectId, Date } = mongoose.Schema.Types;

const Paycheck = mongoose.model(
  "Paycheck",
  new mongoose.Schema(
    {
      staffEmail: {
        type: String,
        required: true,
        ref: User
      },
      month:{
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Completed"], 
        default: "Pending", 
      },
      extra: {
        type: Boolean
      }
     
    },
    { timestamps: true }
  )
);

export default Paycheck;
