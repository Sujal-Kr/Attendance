import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExists, userNotExists } from "../redux/slices/auth";

// const useLoadAttendanceSheet = (standard) => {
//     const [sheet, setSheet] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState("")

//     useEffect(() => {
//         const loadAttendaceSheet = async () => {
//             if(standard==0)return
//             setLoading(true)
//             try {
//                 const { data } = await axios.get(`${server}/api/admin/attendance?standard=${standard}`,{withCredentials:true})
//                 console.log(data)
//                 if (data.success) {
//                     setSheet(data.sheet)
//                 }
//             } catch (err) {
//                 setError(err.response?.data?.message || err.message)
//                 console.log(err.response?.data?.message || err.message)
//             }
//             finally {
//                 setLoading(false)
//             }
//         }
//         loadAttendaceSheet()

//     }, [standard])
//     return { sheet, loading, error }
// }

const useLoadProfile = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const { data } = await axios.get(`${server}/api/user/`, { withCredentials: true })
                if (data.success) {
                    dispatch(userExists(data.user))
                }
            } catch (err) {
                dispatch(userNotExists(null))
                console.error(err.response?.data?.message || err.message)
            }
        }
        loadProfile()
    }, [dispatch])
}

export { 
    useLoadProfile ,
    // useLoadAttendanceSheet
}