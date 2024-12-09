import express from "express";
import {
	createAttendanceSheet,
	getAttendanceSheet,
} from "../controller/attendance.controller.js";
import { protectRoute } from "../middleware/auth.js";
export const adminRouter = express.Router();

adminRouter.use(protectRoute);

adminRouter.route("/attendance").get(getAttendanceSheet);

adminRouter.route("/create-attendance").post(createAttendanceSheet);
