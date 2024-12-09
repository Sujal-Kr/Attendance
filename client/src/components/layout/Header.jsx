import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../constants/config'
import { Link, Links } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { userNotExists } from '../../redux/slices/auth'
import { User } from 'lucide-react'

const Header = () => {
  const dispatch=useDispatch()
  const handleLogout = async() => {
    
    try {
      const {data} =await axios.get(`${server}/api/auth/logout`,{withCredentials:true});
      if(data.success){
        dispatch(userNotExists())
        toast.success("See you ")
      }
    } catch (err) {
      toast.error(err.response.data.message|| err.message);
    }
  }
  const { user } = useSelector((state) => state.auth)
  return (
    <div className='py-3 px-11 bg-gray-700 text-white flex justify-between items-center shadow-md select-none'>
      <p className='text-3xl font-bold mr-auto'>Navbar</p>
      <div className='flex items-center'>
        {
          user ? <User className='text-2xl mr-2' /> :
            <Link to='/login' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>Login</Link>
        }
        {
          user ? <button onClick={handleLogout} className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'>Logout</button> : null
        }
      </div>
    </div>
  )
}

export default Header