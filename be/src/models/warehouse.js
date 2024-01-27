import mongoose from "mongoose";

const { String, Number, ObjectId } = mongoose.Schema.Types;

const Warehouse = mongoose.model(
  "Warehouse",
  new mongoose.Schema(
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String, // You might want to use a different type if storing images, like Buffer or another library specific to handling images
      }
    },
    { timestamps: true }
  )
);

export default Warehouse;
