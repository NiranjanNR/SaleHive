import React from 'react';
import LoginFooter from '../components/LoginFooter';
import { Input } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Home = () => {

    return (
        <div className='h-[85vh]'>
            <div className='mt-10'>
                <div className='flex justify-center items-center'>
                    <AiOutlineShoppingCart className='h-[27px] w-[27px] ml-4 mr-4' />
                </div>
                <div className='flex justify-center items-center h-[83vh]'>
                    <div>
                        <div className='font-semibold text-[30px] flex justify-center'>Welcome Back</div>
                        <div className="w-[300px] mt-8">
                            <Input variant="outlined" color='brown' size='lg' className='py-6' label='Email address' />
                        </div>
                        <div className="w-[300px] mt-6">
                            <div className='text-white bg-brown-600 hover:bg-brown-700 rounded-sm h-[50px] text-[16px] flex justify-center items-center'>Continue</div>
                        </div>
                        <div className="w-[300px] mt-6 text-[14px] flex justify-center">
                            Dont have an account? <span className='ml-2 text-brown-600 hover:text-brown-800'> Sign up</span>
                        </div>
                        <div className="w-[300px] mt-4 text-[14px] flex justify-center">
                            <span className='mr-2 text-blue-gray-200'>--------------------</span> OR <span className='ml-2 text-blue-gray-200'>--------------------</span>
                        </div>
                        <div className="w-[300px] mt-4">
                            <button className='w-[300px] text-blue-gray-800 border-[1px] border-blue-gray-400/70 hover:bg-black/5 rounded-sm h-[50px] text-[16px] flex  items-center'><FcGoogle className='h-[23px] w-[23px] ml-4 mr-4' /> Continue with Google</button>
                        </div>
                        <div className="w-[300px] mt-2">
                            <button className='w-[300px] text-blue-gray-800 border-[1px] border-blue-gray-400/70 hover:bg-black/5 rounded-sm h-[50px] text-[16px] flex  items-center'><FaGithub className='h-[23px] w-[23px] ml-4 mr-4' /> Continue with Github</button>
                        </div>
                        <div className="w-[300px] mt-2">
                            <button className='w-[300px] text-blue-gray-800 border-[1px] border-blue-gray-400/70 hover:bg-black/5 rounded-sm h-[50px] text-[16px] flex  items-center'><FaApple className='h-[23px] w-[23px] ml-4 mr-4' /> Continue with Apple</button>
                        </div>
                    </div>
                </div>
            </div>
            <LoginFooter />
        </div>
    )
}

export default Home