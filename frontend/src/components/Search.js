import React from 'react';

const Search = () => {
  return (
    <div className='flex justify-center'>
      <div className='max-w-screen-lg w-full'>
        <div className='flex justify-center items-end h-[20vh] mb-14'>
          <div className='w-full max-w-screen-xl mx-auto'>
            <div className='flex items-center w-full drop-shadow-2xl bg-[#ffffff] rounded-lg'>
              <input
                className='flex-grow h-16 w-full md:w-64 px-4 text-xl rounded-lg md:h-12 md:w-48 lg:h-10 lg:w-40 xl:h-8 xl:w-32'
                placeholder='Search..'
              />
              <div className='border-l-2 border-gray-300 flex justify-center items-center h-16 w-32'>
                <button className='font-semibold text-gray-900'>Search</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center mb-4 pb-10 border-b-2 border-gray-300'>
          <div>
            <div className='text-3xl font-bold flex justify-center mb-5'>
              View products
            </div>
            <div className='text-gray-800/50 text-center'>
              10,000+ outstanding search center work, designs, illustrations, and graphic elements
            </div>
            <div className='text-gray-800/50 text-center flex justify-center'>
              10,000+ outstanding search center work
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
