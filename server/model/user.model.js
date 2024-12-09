import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can't be empty"]
    },
    class:{
        type:Number,
        required:true 
    },
    email: {
        type: String,
        required: [true, "Email can't be empty"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password can't be empty"],
        main: [8, "Password must be at least 8 characters"],
        select: false
    },
    code:{
        type:String,
    }
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
})

export const userModel = mongoose.models.user || mongoose.model('user', userSchema);