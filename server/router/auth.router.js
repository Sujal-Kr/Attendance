import express from 'express';
export const authRouter= express.Router();
import{signUp,login,logout} from '../controller/auth.controller.js'

authRouter
.route('/signup')
.post(signUp)

authRouter
.route('/login')
.post(login)


authRouter
.route('/logout')
.get(logout)
