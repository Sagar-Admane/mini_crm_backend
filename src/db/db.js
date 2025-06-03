import mongoose from "mongoose";
import env from "dotenv"
env.config();

const URI = process.env.MONGO_URI;

async function connectDb(){
    const conn = await mongoose.connect(URI);
    if(conn){
        console.log("Successfully connected to database");
    } else {
        console.log("Unable to connect to database");
    }
}

export default connectDb;