import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import Addtocart from './Pages/Addtocart';

import Login from './Pages/Login';


function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/Addtocart/:id" element={<Addtocart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
