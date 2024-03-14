import mongoose from "mongoose";

const Shop = mongoose.model(
    'Shop',
    new mongoose.Schema(
        {
            shopName: {
                type: String,
                required: true,
            },
            managerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            staffId: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
            },
            orderId: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
            },
            categoryId: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
            },
            discountId: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discount" }],
            },
            warehouseId: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" }],
            },
            exportImportNoteId: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExportImportNote" }],
            },
            staffNoteId: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "StaffNote" }],
            },
            receiptId: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Receipt" }],
            },
        },
        { timestamps: true },
    )
);

export default Shop