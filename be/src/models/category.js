import mongoose from "mongoose";

const { String, Number, ObjectId } = mongoose.Schema.Types;



const Category = mongoose.model(
  "Category",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }],
    },
    { timestamps: true }
  )
);

export default Category;


