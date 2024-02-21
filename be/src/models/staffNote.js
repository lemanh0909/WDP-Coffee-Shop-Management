import mongoose from "mongoose";

const { String, Number, ObjectId, Date } = mongoose.Schema.Types;

const staffNote = mongoose.model(
    'StaffNote',
    new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
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
        note: {
            type: String,
            required: true
        },
        money: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            enum: ["Increase", "Decrease", "None"],
            default: "None"
        }

    })
    );

    export default staffNote