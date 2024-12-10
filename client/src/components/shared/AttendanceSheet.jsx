import axios	 from "axios";
import React from "react";
import { toast } from 'react-hot-toast';
import { server } from "../../constants/config";

const AttendanceSheet = ({ sheet }) => {
   
    const handleSendCode = async (e) => {
        e.preventDefault()
        const id = toast.loading("Sending Code")
        try {
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
            <form className="font-mono">
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
                                className={`hover:bg-pink-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                            >
                                <td className="border border-gray-300 p-3 text-gray-700">
                                    {student?.details?.name}
                                </td>
                                <td className="border border-gray-300 p-3 text-gray-700">
                                    {student?.details?.email}
                                </td>
                                <td className="border border-gray-300 p-3 capitalize">
                                    {student?.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button 
                        onClick={handleSendCode} 
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Send Code
                    </button>
                    <button 
                        onClick={handleSubmitAttendance} 
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AttendanceSheet;
