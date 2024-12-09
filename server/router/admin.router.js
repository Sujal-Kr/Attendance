import express from 'express'
import { getAttendanceSheet } from '../controller/attendance.controller.js'
import { protectRoute } from '../middleware/auth.js'
export const adminRouter=express.Router()

adminRouter.use(protectRoute)

adminRouter
.route('/attendance')
.get(getAttendanceSheet)
