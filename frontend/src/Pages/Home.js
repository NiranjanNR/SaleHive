import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Items from '../components/Items/Items';

const Home = () => {

  

  return (
    <div className=''>
      <div className=''>
        <NavBar />
        <Search />
        <Items />
      </div>
      <Footer />
    </div>
  )
}

export default Home