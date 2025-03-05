import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await 
        mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, )
        console.log(`\n MONGODB CONNECTION SUCCESSFULL!! DB HOST ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("ERROR IN MONGODB CONNECTION", error)
        process.exit(1); 
        
    }
}

export default connectDB;