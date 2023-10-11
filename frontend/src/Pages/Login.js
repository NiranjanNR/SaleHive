import React, { useState, useEffect } from 'react';
import LoginFooter from '../components/LoginFooter';
import { Input } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Home = () => {

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFToken"
    axios.defaults.withCredentials = true;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false);

    async function onLogin() {
        try {
            const { data, status } = await axios.post('/api/login', {
                "email": email,
                "password": password,
            });

            if (status === 200) {
                navigate('/');
            } else {
                setInvalid(true); // Set invalid to true when login fails
            }
        } catch (error) {
            console.error(error);
            setInvalid(true); // Set invalid to true when there is an error
        }
    }

    async function checkSessionID() {
        try {
            const { data, status } = await axios.get('/api/user');
            if (status == 200) {
                navigate('/')
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        checkSessionID()
    }, []);

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
                            <Input variant="outlined" color='brown' size='lg' className='py-6' label='Email address' onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="w-[300px] mt-8">
                            <Input variant="outlined" color='brown' size='lg' className='py-6' label='Password' type="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="w-[300px] mt-6">
                            <div onClick={() => onLogin()} className='text-white bg-brown-600 hover:bg-brown-700 rounded-sm h-[50px] text-[16px] flex justify-center items-center'>Continue</div>
                        </div>
                        <div className="w-[300px] mt-6 text-[14px] flex justify-center">
                            {invalid ? (
                                <span className='text-red-600'>Invalid email or password</span>
                            ) : null}
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