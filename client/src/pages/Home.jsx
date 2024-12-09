import React, { useEffect, useState } from 'react'
import { getSocket } from '../context/socket'
import { ROLL_CALL } from '../constants/events'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../constants/config'
import { useSelector } from 'react-redux'

const Home = () => {
  const [code, setCode] = useState(124)
  const [text, setText] = useState('')
  const socket = getSocket()
  const { sheet } = useSelector((state) => state.auth)
  
  useEffect(() => {
    socket.on(ROLL_CALL, (data) => {
      console.log(" i am on")
      setCode(data)
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
        toast.success(data.message)
      }
    } catch (err) {
      toast.error(err.response.data.message || err.message, { id })
    }
  }
  return (
    <div>
      <span onClick={handleCopy}>{code}</span>
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter Code '
          className='px-3 text-xs py-2 border border-black outline-none rounded-md  text-slate-900'
        />
        <button type='submit'>Mark My Attendance</button>
      </form>
    </div>
  )
}

export default Home