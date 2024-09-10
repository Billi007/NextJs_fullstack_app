"use client"
import React, {useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from "next/link";

const LoginPage = () => {
  const [user, setUser] = useState({
    password: '',
    email: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const onSignin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      toast.success("Signin successful");
      console.log("Signin successful", response.data);
      //Navigating user to login
      router.push('/profile');

    } catch (error:any) {
      toast.error(error.message)
      console.log("Signin failed", error);
    }
  }

  useEffect(() => {
   if(user.email.length > 0 && user.password.length > 0) {
    setButtonDisabled(false);
   }else{
    setButtonDisabled(true);
   }
  },[user]);

  return (
   <>
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Processing" : "Signin"}</h1>
    <hr />

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
    onClick={onSignin}
    type='submit'
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
    {buttonDisabled ? "No signin" : "Signin"}</button>
     <p>not registered yet? <Link href={'/signup'}>Sign up</Link></p>
  </div>
   </>
  )
}

export default LoginPage