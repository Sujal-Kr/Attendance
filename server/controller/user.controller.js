import { userModel } from "../model/user.model.js"
import { ApiError } from "../utils/utility.js"

const getMyProfile = async (req, res, next) => {
    try {
        const user = await userModel.findById(req._id)
        if (!user) return next(new ApiError("User not found", 404))
        res.json({
            success: true,
            message: "user profile retrieved ", 
            user
        })

    } catch (err) {
        next(err)
    }

}
export { getMyProfile } 