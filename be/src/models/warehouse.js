import mongoose from "mongoose";

const { String, Number, ObjectId } = mongoose.Schema.Types;

const Warehouse = mongoose.model(
  "Warehouse",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
      },
      expiry: {
        type: Date,
      },
      notification: {
        type: String,
      }
    },
    { timestamps: true }
  )
);

export default Warehouse;
