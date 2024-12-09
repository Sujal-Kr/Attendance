import React, { useState } from 'react'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import AttendanceSheet from '../components/shared/AttendanceSheet'
import { server } from '../constants/config'
import { setSheetId } from '../redux/slices/auth'

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState({})
    const [sheet, setSheet] = useState([])
    const dispatch = useDispatch()
    
    const handleSubmitAttendance = () => {
        console.log(attendanceData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        
        try {
            const { data } = await axios.post(`${server}/api/admin/create-attendance`, {
                standard: parseInt(formdata.get("class"))
            }, { withCredentials: true })

            console.log(data)
            if (data.success) {
                setSheet(data.sheet)
                console.log("Data", data)
                dispatch(setSheetId(500))
            }
        } catch (error) {
            console.log(error.response.data.message || error.message)
        }
    }

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            Take Attendance
                        </h2>

                        <form onSubmit={handleSubmit} className="mb-8">
                            <input
                                type="text"
                                name="class"
                                placeholder="Enter class name (e.g., 10A)"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <button
                                type='submit'
                                className='px-4 my-4 text-sm py-2 rounded-md shadow bg-blue-600 text-white hover:bg-blue-700 transition duration-200'
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <AttendanceSheet sheet={sheet} />
                </div>
            </div>
        </div>
    )
}

export default Attendance
