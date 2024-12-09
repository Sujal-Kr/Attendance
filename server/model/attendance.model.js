import mongoose, { Types } from "mongoose";

const attendanceSchema = mongoose.Schema({

    date: {
        type: Date,
        required: true,
        unique: true 
    },
    standard: {
        type: Number,
        required: true
    },
    students: [{
        details: {
            type: Types.ObjectId,
            ref: 'user'
        },
        status:{
            type:String,
            enum:['present','absent'],
            default:'present'
        }
    }],
    marked:{
        type:Boolean,
        default:false
    }
});

attendanceSchema.index({ date: 1, class: 1 }, { unique: true });

export const attendanceModel = mongoose.models.attendance || mongoose.model('attendance', attendanceSchema);