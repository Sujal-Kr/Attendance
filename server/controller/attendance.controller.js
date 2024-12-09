
import dayjs from 'dayjs';
import { attendanceModel } from '../model/attendance.model.js';
import { userModel } from '../model/user.model.js';
import { ApiError, emitEvent } from '../utils/utility.js';
import { v4 as uuid } from 'uuid';
import { ROLL_CALL } from '../constants/events.js';

const getAttendanceSheet = async (req, res, next) => {
    try {
        // Destructure query parameters with default values
        // console.log("i am in")
        const { standard = 12 } = req.query;
        console.log(standard)
        const sheet = await userModel.find({
            class: standard,
        })

        return res.status(200).json({
            success: true,
            message: "Attendance Sheet Fetched Successfully",
            sheet
        })

    } catch (err) {
        console.error('Full error in getAttendanceSheet:', err.message)
        next(err);
    }
};


const createAttendanceSheet = async (req, res, next) => {
    try {
        const { standard } = req.body;
        const formattedDate = dayjs().toDate(); // Convert to Date object

        // Check if sheet already exists for this standard and date
        const existingSheet = await attendanceModel.findOne({
            standard,
            date: {
                $gte: dayjs().startOf('day').toDate(),
                $lt: dayjs().endOf('day').toDate()
            }
        }).populate('students.details', 'name email')

        if (existingSheet) {
            return res.status(200).json({
                message: 'Attendance Sheet Already Exists',
                success: true,
                sheet: existingSheet
            });
        }

        // Find students for the standard
        const students = await userModel.find({ class:standard });

        // Create new attendance sheet
        const newSheet = await attendanceModel.create({
            standard,
            date: formattedDate,
            students: students.map(student => ({
                details: student._id,
                status: 'present' // Default status
            }))
        });

        // Populate the created sheet
        const populatedSheet = await attendanceModel.findById(newSheet._id).populate({
            path: 'students.details',
            select: 'name email' // Select specific fields to populate
        });

        return res.status(201).json({
            message: 'Attendance Sheet Created',
            success: true,
            sheet: populatedSheet
        });

    } catch (err) {
        console.error('Full error in Create attendance:', err.message);
        next(err);
    }
};



const markMyAttendance = async (req, res, next) => {
    try {
        const { _id, code } = req.body
        const sheet = await attendanceModel.findById(_id)
        if (!sheet) {
            return next(new ApiError("No Record Found", 404))
        }
        const student = await userModel.findById(req._id)

        if (!student) {
            return next(new ApiError("No Student Found", 404))
        }

        if (code != student.code) {
            return next(new ApiError("Wrong Code", 404))
        }

        sheet.students = sheet.students.map((students) => {
            return {
                details: students.details,
                status: "present"
            }
        })

        await sheet.save()

        return res.stastus(200).json({
            success: true,
            message: 'Attendance Marked',
        })
    } catch (err) {
        next(err)
    }
}

const sendCodeToStudent = async (req, res, next) => {
    try {
        const { _id } = req.body
        const sheet = await findById(_id)
        if (!sheet) return next(new ApiError("No Record Found", 404))
        sheet.students.forEach(async ({ details }) => {
            const student = await userModel.findById(details)
            if(!student){
                return next(new ApiError("Failed to send Code", 404))
            }
            const code=uuid()
            emitEvent(ROLL_CALL,req,details,code)
            student.code = code
            student.save()
        })
       
        return res.status(200).json({
            success: true,
            message: "Code Sent Successfully"
        })
    } catch (err) {
        next(err)
    }

}

export { getAttendanceSheet, createAttendanceSheet, markMyAttendance, sendCodeToStudent };