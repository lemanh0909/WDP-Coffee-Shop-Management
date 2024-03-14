import mongoose from "mongoose";

const { String, Number, ObjectId, Date } = mongoose.Schema.Types;

const Receipt = mongoose.model(
  "Receipt",
  new mongoose.Schema(
    {
    
      name: {
        type: String,
        required: true,
      },
      date:{
        type: Date,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Income", "Expense"], 
        default: "Income", 
      },
      description: {
        type: String,
      },
     
    },
    { timestamps: true }
  )
);

export default Receipt;
