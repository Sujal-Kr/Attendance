import jwt from "jsonwebtoken"
import { userModel } from "../model/user.model.js"
import cookieParser from 'cookie-parser'

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "user not logged in"
            })
        }
        const secret = process.env.JWT_SECRET
        const payload = jwt.verify(token, secret)
        console.log(payload)
        req._id=payload._id
        if (!payload) {
            return res.status(401).json({
                success: false,
                message: "authorization failed"
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Protect Route"+err.message
        })
    }
}

const socketAuthentication = async (socket, next) => {
    try {
        
        const cookie = cookieParser.JSONCookies(socket.handshake.headers.cookie)
        if (!cookie) return next(new Error("user not logged in"))
        const token = cookie.split("=")[1]

        // console.log(token)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (!payload) return next(new Error("Couldn't verify token"))
        const user = await userModel.findById(payload._id)
        if (!user) return next(new Error("User not found"))
        socket.user = user._id
        next()
    } catch (error) {
        console.log("Socket Auth"+error.message)
        return next(new Error(error))
    }
}

export {protectRoute,socketAuthentication}