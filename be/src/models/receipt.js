import mongoose from "mongoose";

const { String, Number, ObjectId, Date } = mongoose.Schema.Types;

const Receipt = mongoose.model(
  "Receipt",
  new mongoose.Schema(
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      userId: {
        type: String, 
        required: true,
      },
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
        enum: ["Imported", "Exported"], 
        default: "Imported", 
      },
      description: {
        type: String,
      },
     
    },
    { timestamps: true }
  )
);

export default Receipt;
