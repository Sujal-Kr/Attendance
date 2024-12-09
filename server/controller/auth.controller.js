import { userModel } from "../model/user.model.js"
import { ApiError, options, sendToken } from "../utils/utility.js"
import bcrypt from "bcrypt"

const signUp = async (req, res, next) => {
    try {
        const { name, class: className, email, password } = req.body

        const existingUser = await userModel.findOne({email});
        console.log(existingUser)
        if(existingUser){
            return sendToken(res,401,existingUser, `Already exists an account...!`)
        }
        const user = await userModel.create({ name, class:className, email, password })
        console.log(user, "From Auth User")
        sendToken(res, 201, user, `welcome ${user.name}`)
    } catch (err) {
        
        next(err)
    }

}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email }).select("+password")
        if (!user) return next(new ApiError("Invalid Email", 404))
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return next(new ApiError("Wrong password", 401))
        sendToken(res, 200, user, `Welcome back ${user.name}`)

    } catch (err) {
        console.error(err.message)
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        res.cookie("token", "", { ...options, maxAge: "0" })
        return res.json({
            success: true,
            message: "user logged out"
        })
    } catch (err) {
        next(err)
    }
}


export {
    signUp,
    login,
    logout
}