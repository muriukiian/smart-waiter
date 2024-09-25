'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify';

const Login = () => {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get("password");

        if(!username || !password){
            toast.error("All fields are mandatory.");
            return;
        }
        else{
            try {
                const response = await fetch("http://localhost:5001/api/auth/login",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({username, password})                    
                })
                if(response.status !== 200){
                    toast.error("Invalid credentials.");
                    return;
                }
                else if(response.status === 200){
                    const {token} = response.json();
                    try {
                        const res = await fetch("http://localhost:5001/api/user/",{
                            method:"GET",
                            headers:{
                                "Authorization" : `Bearer ${token}`,
                                "Content-Type":"application/json"
                            }
                        })
                        if(res.status !== 200){
                            router.push("/login")
                            toast.error("Verification failed");
                            return;
                        }
                        else{
                            const credentials = await res.json();
                            localStorage.setItem("id", credentials.id);
                            localStorage.setItem("role", credentials.role);
                            if(credentials.id && credentials.role === 'waiter/waitress'){
                                router.push('/waiter')
                                toast.success("Successfully logged in as waiter/waitress");
                                return;
                            }
                            else if(credentials.id && credentials.role==='barman'){
                                router.push('/barman')
                                toast.success("Successfully logged in as barman");
                                return;
                            }
                            else if(credentials && credentials.role === 'kitchen'){
                                router.push('/kitchen');
                                toast.success("Successfully logged in as kitchen");
                                return;
                            }
                            else if(credentials && credentials.role === 'room service'){
                                router.push('/rooms')
                                toast.success("Successfully logged in as room service.");
                                return;
                            }
                            else if(credentials && credentials.role === 'manager'){
                                router.push('/manager')
                                toast.success("Successfully logged in as manager");
                                return;
                            }
                            else if (credentials && credentials.role === 'admin'){
                                router.push('/admin')
                                toast.success("Successfully logged in as admin");
                                return;
                            }
                        }
                    } catch (error) {
                        toast.error(error);
                        return;
                    }
                }
            } catch (error) {
                toast.error(error);
                return;
            }
        }
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-yellow-100'>
        <div className='p-8 bg-white rounded w-[96] shadow-md'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-black text-2xl font-bold w-[96]'>Log In</h2>
                <label htmlFor='username' className='font-semibold text-xl text-gray-600'>Username</label><br/>
                <input className='p-2 border border-gray-800 rounded w-96 mb-4' type='text' name='username' id='username' /><br/>
                <label htmlFor='password' className='font-semibold text-xl text-gray-600'>Password</label><br/>
                <input className='p-2 border border-gray-800 rounded w-96 mb-4' type='password' name='password' id='password' /><br />
                <button type='submit' className='p-2 bg-purple-500 hover:bg-purple-700 w-96 rounded mt-2'>Register</button><br/>
                <span>Not yet registered? Contact Administrator for guidance.</span>
            </form>
        </div>
    </div>
  )
}

export default Login