import mongoose from "mongoose";
import Warehouse from "./warehouse";

const { String, Number, ObjectId, Date } = mongoose.Schema.Types;

const ExportImportNote = mongoose.model(
  "ExportImportNote",
  new mongoose.Schema(
    {
      warehouse: {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Warehouse,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      userId: {
        type: String,
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

export default ExportImportNote;
