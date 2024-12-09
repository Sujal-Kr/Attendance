import mongoose from "mongoose";


const dbConnect=async()=>{
    try {
        const uri=process.env.DB_URL
        const db=await mongoose.connect(uri)
        if(db){
            console.log("Connected to database")
        }
    } catch (err) {
        console.log("Failed to connect to database",err.message)
    }
    
}

export {dbConnect}