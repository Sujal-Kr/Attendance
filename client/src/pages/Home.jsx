import React, { useEffect, useState } from 'react'
import { getSocket } from '../context/socket'
import { ROLL_CALL } from '../constants/events'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../constants/config'
import { useSelector } from 'react-redux'

const Home = () => {
  const [code, setCode] = useState(null)
  const [sheet, setSheet] = useState(null)
  const socket = getSocket()
  
  
  useEffect(() => {
    socket.on(ROLL_CALL, (data) => {
      console.log(" i am on", data)
      setCode(data.code)
      setSheet(data.sheetId)
    })
  }, [socket])
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success("Text Copied")
    } catch (err) {
      toast.error(err.message || "Failed to copy")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = toast.loading("Please wait...")
    try {
      console.log("Sheet Id",sheet)
      const { data } = await axios.post(`${server}/api/admin/attendance/mark-attendance`, { _id: sheet, code }, { withCredentials: true })
      if (data.success) {
        toast.success(data.message, {id})
      }
    } catch (err) {
      toast.error(err.response.data.message || err.message, { id })
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 overflow-hidden select-none">
      <div className="bg-white shadow-2xl  rounded-lg p-10 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Attendance Marking</h2>
        { code && <p className="text-center text-md text-gray-700 mb-4">Click to copy the Code</p>}
        <span onClick={handleCopy} className="block text-center text-xl font-semibold mb-4 cursor-pointer hover:bg-blue-100 hover:shadow-md transition duration-200 select-none">{code}</span>
        <form onSubmit={handleSubmit}>
          <input type="text"
            placeholder='Enter Code'
            className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mb-4'
          />
          <button type='submit' className='w-full mt-2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200'>Mark My Attendance</button>
        </form>
      </div>
    </div>
  )
}

export default Home