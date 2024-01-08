import mongoose from "mongoose"

//Ham ket noi CSDL MongoDB
const connectDB = () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI)
        console.log("Connect succesfully");
        return connection
    } catch (error) {
        throw new Error('Connection failse')
    }
}

export default connectDB