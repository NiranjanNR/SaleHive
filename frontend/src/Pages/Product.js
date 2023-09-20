import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import { BsCartFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import Items from '../components/Items/Items';
import Footme from '../components/Footer';

const Product = () => {

    const { id } = useParams();

    const [products, setProducts] = useState([])
    const [requiredProduct, setRequiredProduct] = useState([])
    useEffect(() => {
        async function fetchProduct() {
            const { data } = await axios.get('/api/products/')
            setProducts(data)
            setRequiredProduct((products.filter((item) => item.id === id)))
        }
        fetchProduct()
    }, [id, products])

    const numbers = [1, 2, 3, 4, 5, 6]
    const [number, setNumber] = useState(false)

    return (
        <div className=''>
            <div className='drop-shadow-md'><NavBar /></div>
            {requiredProduct.map((item) => (
                <div className='grid md:grid-cols-2 grid-cols-1 mx-10'>
                    <div>
                        <div className='text-sm font-light py-6 flex'>SaleHive / Products / <p className='text-[rgb(123,63,0)] ml-2'>{item.name}</p></div>
                        <img src={item.image} alt="" className=" w-full object-cover" />
                        <button className='bg-gray-800/10 w-full py-4 mt-8 flex justify-center font-bold text-gray-800'>View more photos</button>
                    </div>
                    <div className='pt-8 m-9'>
                        <div className='text-2xl font-bold '>{item.name}</div>
                        <div className='text-xl font-semibold text-gray-800/40 py-2'>Items remaining:{item.quantity}</div>
                        <div className='text-xl font-semibold '>${item.price}</div>
                        <div className='text-sm font-semibold text-green-500 pb-3'>inclusive of all taxes</div>
                        <div className='font-semibold pb-3'>How much of it do you want?</div>
                        <div>
                            {numbers.map((amount) => (
                                <button className={`border text-gray-800/50 w-10 h-10 rounded-full mx-2 hover:text-gray-800 hover:bg-gray-200/50`} onClick={() => { setNumber(!number) }}>{amount}</button>
                            ))
                            }
                        </div>
                        <div className='flex mt-6 border-b border-gray-500/50 pb-10'>
                            <div className='py-4 mr-5 pl-16 pr-20 flex items-center bg-[rgb(123,63,0)] hover:bg-[#7b4000ce] text-white font-semibold'>
                                <BsCartFill className='text-white mr-3' />
                                ADD TO CART
                            </div>
                            <div className='py-4 pl-12 pr-16 flex items-center justify-center border border-gray-500 text-gray-800 font-semibold hover:border-gray-800'>
                                <AiOutlineHeart className='text-gray-800 mr-2 text-lg' />
                                Wishlist
                            </div>
                        </div>
                        <div className='text-xl text-gray-800 font-semibold py-6'>Product description:</div>
                        <div className='text-gray-800/50'>{item.description}</div>

                    </div>
                </div>
            ))}
            <div className='text-lg text-gray-900 font-semibold pt-12 pb-4 mx-12'>Similar Products</div>
            <Items />
            <Footme />
        </div>
    )
}

export default Product