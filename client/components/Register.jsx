'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Register = () => {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("")
    const handleChange = (e) =>{
        setSelectedRole(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const username = formData.get("username");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword")
        const role = selectedRole;

        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        else if(!username || !password || !confirmPassword || !role){
            toast.error("All input fields are mandatory.");
            return;
        }
        else{
            try {
                console.log(role)
                console.log(username)
                const response = await fetch("http://localhost:5002/api/auth/register",{
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({username, password, role})
                })
                if (response.status === 400){
                    toast.error("User already exists.");
                    return;
                }
                else if(response.status === 201){
                    toast.success("User registered successfully!")
                    router.push('/login')
                }
            } catch (error) {
                toast.error(error);
                return;
            }
        }

    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-yellow-100'>
        <div className='p-8 rounded shadow-md bg-white'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-black text-2xl font-bold w-[96]'>Register</h2>
                <label htmlFor='username' className='font-semibold text-xl text-gray-600'>Username</label><br/>
                <input className='p-2 border border-gray-800 rounded w-96 mb-4' type='text' name='username' id='username' /><br/>
                <label htmlFor='password' className='font-semibold text-xl text-gray-600'>Password</label><br/>
                <input className='p-2 border border-gray-800 rounded w-96 mb-4' type='password' name='password' id='password' /><br />
                <label htmlFor='confirmPassword' className='font-semibold text-xl text-gray-600'>Confirm Password</label><br/>
                <input className='p-2 border border-gray-800 rounded w-96 mb-4' type='password' name='confirmPassword' id='confirmPassword' /><br />
                <label htmlFor='role' className='font-semibold text-xl text-gray-600'>Select a role</label><br />
                <select id='role' value={selectedRole} onChange={handleChange} className='w-96'>
                    <option value='admin'>Admin</option>
                    <option value='manager'>Manager</option>
                    <option value='waiter/waitress'>Waiter / Waitress</option>
                    <option value='kitchen'>Kitchen</option>
                    <option value='barman'>Bar and Beverage</option>
                    <option value='room service'>Room</option>
                </select><br/>
                <button type='submit' className='p-2 bg-purple-500 hover:bg-purple-700 w-96 rounded mt-2'>Register</button><br/>
                <span>Already registered?
                    <Link href='/login' className='text-purple-700 hover:underline'> Log In</Link>
                </span>
            </form>
        </div>
    </div>
  )
}

export default Register