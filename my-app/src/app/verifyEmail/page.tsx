"use client"
import axios from 'axios'
import { useEffect, useState } from 'react';
import Link from "next/link";
import {toast} from 'react-hot-toast'

const VerifyPage = () => {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyEmail', token)
      setIsVerified(true);
      toast.success('Email verified successfully!');
      setError(false);

    } catch (error:any) {
      setError(true);
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    setError(false)
   const urlToken = window.location.search.split('=')[1];
   setToken(urlToken || '');

  //  const {query} = router;
  //  const urlToken = query.token;
  },[])

  useEffect(() => {
    setError(false)
   if(token.length > 0){
    verifyUserEmail()
   }
   },[token])

  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>

      <h2 className="p-2 bg-orange-500 text-black mt-4">
        {token ? `${token}` : "No token found"}
      </h2>
        
        {
          isVerified && (
            <div>
              <h2  className="text-2xl">User Verified</h2>
              <Link href="/login">Login</Link>
            </div>
          )}

          {error && (
            <div>
               <h2  className="text-2xl">Error</h2>
            </div>
          )}
    </div>
  )
}

export default VerifyPage