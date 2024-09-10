"use client"
import React, {useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from "next/link";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup successful", response.data);
      toast.success("Signup successful");
      //Navigating user to login
      router.push('/login');

    } catch (error:any) {
      console.log("Signup failed", error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
   if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
    setButtonDisabled(false);
   }else{
    setButtonDisabled(true);
   }
  },[user]);

  return (
   <>
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Processing" : "Signup"}</h1>
    <hr />

    <input
     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
     type="text"
     placeholder="username"
     value={user.username}
     onChange={(e) => setUser({...user, username: e.target.value})}/>

   <input
     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
     type="text"
     placeholder="email"
     value={user.email}
     onChange={(e) => setUser({...user, email: e.target.value})}/>

   <input
     className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
     type="text"
     placeholder="password"
     value={user.password}
     onChange={(e) => setUser({...user,password: e.target.value})}/>

    <button
    onClick={onSignup}
    type='submit'
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
    {buttonDisabled ? "No signup" : "Signup"}</button>
     <p>Already a member? <Link href={'/login'}>Sign In</Link></p>
  </div>
   </>
  )
}

export default SignupPage