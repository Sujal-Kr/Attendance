import express from 'express';
import { getMyProfile } from '../controller/user.controller.js';
import { protectRoute } from '../middleware/auth.js';
export const userRouter =express.Router();

userRouter
.route('/')
.get(protectRoute,getMyProfile)