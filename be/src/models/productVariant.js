import mongoose from "mongoose";
import Warehouse from "./warehouse.js";

const IngredientSchema = new mongoose.Schema({
    warehouse: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    require: {
      type: Number,
      required: true,
    },
    // Các trường khác của nguyên liệu
  });
const ProductVariant = mongoose.model(
    "ProductVariant",
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            size: {
                type: String,
                enum: ["S", "M", "L"],
                default: "M",
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: [String],
            },
            recipe: {
                type: [IngredientSchema],
            },
        },
        { timestamps: true }
    )
);

export default ProductVariant;
