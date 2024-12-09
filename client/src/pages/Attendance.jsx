import React, { useState } from 'react'
import { useLoadAttendanceSheet } from '../hooks/api'
import AttendanceSheet from '../components/shared/AttendanceSheet'

const Attendance = () => {
    // const [students, setStudents] = useState([])
    const [attendanceData, setAttendanceData] = useState({})
    const [standard,setStandard]=useState(0)
    const {sheet,loading:sheetLoading,error:sheetError}=useLoadAttendanceSheet(standard)
    const handleAttendanceChange = (studentId, value) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: value
        }))
    }

    const handleSubmitAttendance = () => {
        console.log(attendanceData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata=new FormData(e.target)
        setStandard(parseInt(formdata.get('class')))
        // formdata.reset()
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
                                placeholder="Enter class name"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <button
                            type='submit'
                            className='px-4 my-4  text-sm py-2 rounded-md shadow bg-blue-600 text-white'
                            disabled={sheetLoading}
                            >
                                Submit
                                {/* {sheetLoading?<Lod:"Submit"} */}
                            </button>
                        </form>
                    </div>
                        <AttendanceSheet sheet={sheet}/>
                </div>
            </div>
        </div>
    )
}

export default Attendance
