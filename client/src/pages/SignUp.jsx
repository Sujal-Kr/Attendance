import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { server } from '../constants/config';
import { userExists } from '../redux/slices/auth';


function SignUp() {
  
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formdata=new FormData(e.target)
    const credentials={
        name:formdata.get('name'),
        email:formdata.get('email'),
        password:formdata.get('password'),
        class:formdata.get('class')
    }
    try {
        const {data}=await axios.post(`${server}/api/auth/signup`,credentials,{withCredentials:true})
        console.log(data)
        if(data.success) {
            dispatch(userExists(data.user))
            toast.success(data.message)
        }
    } catch (err) {
        toast.error(err.response?.data?.message)
    }
    
    
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-xl shadow-lg border border-gray-300">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to get started
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Enter your full name"
            />

            <input
              id="class"
              name="class"
              type="text"
              required
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Enter your class"
            />

            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Enter your email"
            />

            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 text-sm border border-transparent rounded-lg shadow-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-xs">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition duration-150">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;