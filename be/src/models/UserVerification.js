import mongoose,{ObjectId,Schema} from "mongoose";

const UserVerification = mongoose.model("UserVerification",new Schema({
    id:ObjectId,
    userId:{
		type: String,
		require: true
	},
    uniqueString: {
		type: String,
		require: true
	},
},
{
	timestamps: true
}));
export default UserVerification;