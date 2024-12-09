import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../constants/config'
import { Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { userNotExists } from '../../redux/slices/auth'

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
    <div className='p-3  shadow flex justify-between'>
      <p className='text-3xl'>Navbar</p>
      {
        user ? <button onClick={handleLogout}>Logout</button> :
          <Link to='/login'>Login</Link>
      }
    </div>
  )
}

export default Header