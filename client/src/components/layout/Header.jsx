import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../constants/config'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { userNotExists } from '../../redux/slices/auth'
import { User } from 'lucide-react'

const Header = () => {
  const { pathname } = useLocation()
  if (['/login', '/signup'].includes(pathname)) {
    return null
  }

  const dispatch = useDispatch()
  const handleLogout = async () => {

    try {
      const { data } = await axios.get(`${server}/api/auth/logout`, { withCredentials: true });
      if (data.success) {
        dispatch(userNotExists())
        toast.success("See you ")
      }
    } catch (err) {
      toast.error(err.response.data.message || err.message);
    }
  }
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='p-5 flex justify-between items-center'>
      <p className='text-3xl custom-gradient font-semibold'>Smart Roll</p>
      {
        user ? <button onClick={handleLogout} className='btn'>Logout</button> :
          <Link to='/login' className='btn'>Login</Link>
      }
    </div>
  )
}

export default Header