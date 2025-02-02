"use client"
import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Profile = () => {
  const [data, setData] = useState("Nothing");
  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/users/me');
      setData(response.data.data._id)
    } catch (error:any) {
      toast.error(error.message)
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
     await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push('/login');
    } catch (error:any) {
      toast.error(error.message)
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <hr />
    <p>Profile page</p>
    <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing to display" : <Link href={`/profile/${data}`}>{data}
    </Link>}</h2>
<hr />
<button
onClick={logout}
className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>Logout</button>

<button
onClick={getUserDetails}
className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>GetUser Details</button>


    </div>
  )
}

export default Profile