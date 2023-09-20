import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillHeart } from "react-icons/ai";
import { motion } from 'framer-motion'

const Cardy = (props) => {
  const [heart, setHeart] = React.useState(false);
  return (
    <motion.div whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <Link className="w-[15rem] h-[15rem] overflow-hidden  bg-mine" to={`/product/${props.id}`}><img src={props.image} alt="" className=" rounded-lg w-full h-[13rem] object-cover" /></Link>
      <div className="flex px-2 items-center pt-1">
        <button onClick={() => { setHeart(!heart) }}><AiFillHeart className={`text-md  font-bold text-center mr-2 hover:text-pink-500 ${heart ? 'text-pink-500' : 'text-gray-500 '}`} /></button>
        <h5 className="text-gray-800 text-md  font-bold text-center">{props.name}</h5>
        <p className="text-gray-400 text-sm  font-bold ml-auto text-center">Items Remaining : {props.quantity}</p>
        <p className="text-green-500 font-bold text-sm ml-auto py-1 px-2 rounded-md">${props.price}</p>
      </div>
    </motion.div>
  );
}

export default Cardy
