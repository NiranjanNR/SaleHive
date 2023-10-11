import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card';

const Items = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get('/api/products/');
      setProduct(data);
    }
    fetchProduct();
  }, []);

  return (
    <div className="bg-sky-100 flex justify-center mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-5/6">
        {product.map((item) => (
          <div key={item.id} className="">
            <Card id={item.id} name={item.name} quantity={item.id} price={item.price} image={item.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
