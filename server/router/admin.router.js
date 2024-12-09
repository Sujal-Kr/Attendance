import express from "express";
import {
	createAttendanceSheet,
    markMyAttendance,
    sendCodeToStudent,
} from "../controller/attendance.controller.js";
import { protectRoute } from "../middleware/auth.js";
export const adminRouter = express.Router();

adminRouter.use(protectRoute);

adminRouter.route("/attendance/send-code").post(sendCodeToStudent);
adminRouter.route("/attendance/mark-attendance").post(markMyAttendance);
adminRouter.route("/create-attendance").post(createAttendanceSheet);

