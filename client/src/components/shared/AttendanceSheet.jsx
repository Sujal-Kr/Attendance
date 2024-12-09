import axios from "axios";
import React from "react";
import { toast } from 'react-hot-toast';
import { server } from "../../constants/config";

const AttendanceSheet = ({ sheet }) => {
   
    const handleSendCode = async (e) => {
        e.preventDefault()
        const id = toast.loading("Sending Code")
        try {
            console.log(sheet)
            const { data } = await axios.post(`${server}/api/admin/attendance/send-code`, { _id:sheet._id }, { withCredentials: true })
            if (data.success) {
                toast.success("Code Sent!" ,{id} )
                
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message,  {id} )
        }
    }
    const handleSubmitAttendance=()=>{
        console.log("Attendance Submitted")
    }
    return (
        <div className="w-full p-5 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
                Attendance Sheet
            </h2>
            <form>
                <table className="min-w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-3 text-left">Name</th>
                            <th className="border border-gray-300 p-3 text-left">Email</th>
                            <th className="border border-gray-300 p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sheet?.students?.map((student, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                            >
                                <td className="border border-gray-300 p-3 text-gray-700">
                                    {student?.details?.name}
                                </td>
                                <td className="border border-gray-300 p-3 text-gray-700">
                                    {student?.details?.email}
                                </td>
                                <td className="border border-gray-300 p-3">
                                    {student?.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button onClick={handleSendCode}>Send Code</button>
                    <button onClick={handleSubmitAttendance}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AttendanceSheet;
