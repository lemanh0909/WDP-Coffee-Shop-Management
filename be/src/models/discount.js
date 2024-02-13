import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        percent: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        categories: {
            type: [String], // Mảng các loại danh mục
            default: [],
        },
        products: {
            type: [String], // Mảng các loại danh mục
            default: [],
        },
    },
    { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
