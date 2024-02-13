import mongoose from "mongoose";
import ProductVariant from "./productVariant";

const Product = mongoose.model(
    'Product',
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            description: { type: String },
            image: { type: String},
            productVariant: [ProductVariant.schema]
        },
        {timestamps: true}
    )
)

export default Product;