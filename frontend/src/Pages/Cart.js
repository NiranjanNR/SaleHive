import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    AiOutlineArrowRight
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar/NavBar';



const Cart = () => {

    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data } = await axios.get('/api/view_cart/');
                const { data: filter } = await axios.get('/api/products/');
                setProducts(filter);
                setCart(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error as needed (e.g., show an error message to the user)
            }
        }
        fetchProduct();
    }, []);

    async function removeFromCart(id) {
        const { data, status } = await axios.post('/api/remove_from_cart/', {
            "cart_item_id": id,
        });
        if (status == 200) {
            navigate('/')
        }

    }

    useEffect(() => {
        const filtered = products.map(product => {
            const cartItem = cart.find(cartItem => cartItem.product == product.id);
            if (cartItem) {
                return {
                    ...product,
                    cart_item: cartItem.id
                };
            }
        }).filter(Boolean);
        setFilteredProducts(filtered);
        console.log(filtered);
    }, [cart, products]);

    return (
        <div className=''>
            <div className=''>
                <NavBar />
                <div className='mb-5 flex justify-center border-b-2 p-6 text-[#7b4000ce] tracking-[1.5px] text-xl font-mono font-semibold'>
                    Your Bag
                </div>
                <div className='flex justify-center mb-4'>
                    <div className=' border-2 py-5 px-3 text-[13px] grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-lg rounded-xl'>
                        <div className='mr-4'>
                            Deliver to: <span className='font-semibold'>abc@gmail.com</span><br />
                            <span className='text-[11px] '>1234 Laughing Lane, Hahaville, Chuckles County, ROFL 98765 ...</span>
                        </div>
                        <div className='flex justify-center'>
                        <button className='p-2 flex items-center justify-center border border-[#7b4000ce] hover:bg-[#7b400004] text-[#7b4000ce] font-semibold w-1/2 '>
                            Change Address
                        </button>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='border-2 py-5 px-3 text-[13px] grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-lg rounded-xl'>
                        <div className='mr-4'>
                            <span className='font-bold'>% Available offers</span><br />
                            <span className='text-[11px] '>Earn Cashback: Every online purchase earns you cashback rew...</span>
                        </div>
                        <div className='flex justify-center'>
                        <button className='p-2 flex items-center justify-center border border-[#7b4000ce] hover:bg-[#7b400004] text-[#7b4000ce] font-semibold w-1/2 '>
                            Check it out <span className='ml-3'><AiOutlineArrowRight /></span>
                        </button>
                        </div>
                    </div>
                </div>
                <div className='mt-7 flex justify-center '>
                    <div className='ml-20 mb-3 w-[42%] font-semibold text-[17px] tracking-wide text-blue-gray-800/90'>ITEMS SELECTED</div>
                </div>
                <div>
                    {filteredProducts.map((item) => (
                        <div className='flex justify-center mt-4'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 border-2 w-1/2 text-[13px] shadow-lg rounded-xl'>
                            <div className='flex items-center justify-center'>
                                <img src={item.image} alt="" className=" rounded-lg h-32 " />
                                </div>
                                <div className='ml-6'>
                                    <div className=''>
                                        <span className='font-bold text-[14px]'>{item.name}</span><br />
                                        <div className='text-black/40 text-[12px] w-[90%] h-[38px] overflow-hidden font-semibold'>{item.description}</div>...
                                    </div>
                                    <div className='mr-4 text-[12px]'>
                                        Delivery:<span className='font-bold'>Yes</span><br />
                                    </div>
                                    <div className='mr-4'>
                                        <span className='font-bold text-[#7b4000ce]'>₹{item.price}</span><br />
                                    </div>
                                    <button onClick={() => removeFromCart(item.cart_item)} className="my-2 px-3 py-2 bg-red-500 text-white rounded-lg font-bold">
                                        Remove
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                    <div className='mt-7 flex justify-center '>
                        <button className=' px-2 py-3 rounded-md mb-5 flex items-center bg-[rgb(123,63,0)] hover:bg-[#7b4000ce] text-white font-semibold'>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Cart