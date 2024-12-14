import axios from "axios";
import React from "react";
import { toast } from 'react-hot-toast';
import { server } from "../../constants/config";

const AttendanceSheet = ({ sheet }) => {
    const list=["Name","Email","Status"]

    const handleSendCode = async (e) => {
        e.preventDefault()
        const id = toast.loading("Sending Code")
        try {
            const { data } = await axios.post(`${server}/api/admin/attendance/send-code`, { _id: sheet._id }, { withCredentials: true })
            if (data.success) {
                toast.success("Code Sent!", { id })

            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message, { id })
        }
    }
    const handleSubmitAttendance = () => {
        console.log("Attendance Submitted")
    }
    return (
        <div className="w-full p-6 bg-white rounded-2xl shadow-xl my-10">
            <h2 className="text-center text-3xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text mb-8">
                Attendance Sheet
            </h2>
            <form className="font-sans">
                    <div className="grid grid-cols-3 place-items-center border-b p-2  ">
                        {
                            list.map((item,index)=>(
                                <p key={index}>{item}</p>
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-4 py-4">
                        {sheet?.students?.map((student, index) =>
                            <div
                                key={index}
                                className={"grid grid-cols-3 place-items-center  "}
                            >
                                <p >{student?.details?.name}</p>
                                <p >{student?.details?.email}</p>
                                <p className="bg-primary text-xs p-1 rounded-full text-white px-2 ">{student?.status}</p>
                            </div>
                        )}
                    </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleSendCode}
                        className="btn !font-semibold"
                    >
                        Send Code
                    </button>
                    <button
                        onClick={handleSubmitAttendance}
                        className="btn !font-semibold"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    );
};

export default AttendanceSheet;
