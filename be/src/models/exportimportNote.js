import mongoose from "mongoose";

const { String, Number, ObjectId, Date } = mongoose.Schema.Types;

const ExportImportNote = mongoose.model(
  "ExportImportNote",
  new mongoose.Schema(
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      userId: {
        type: String, // You might want to use ObjectId here if it represents another user's ID
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"], // Add relevant status values
        default: "Pending",
      },
      description: {
        type: String,
      },
      image: {
        type: String, 
      },
     
    },
    { timestamps: true }
  )
);

export default ExportImportNote;
