import React from 'react'

const Search = () => {
    return (
        <div className='flex justify-center'>
            <div className=''>
                <div className='flex justify-center items-end h-[20vh] mb-14'>
                    <div className='flex items-center w-[100%] h-[60px] drop-shadow-2xl bg-[#ffffff] rounded-lg'>
                        <input className='h-[60px] w-[550px] px-8 text-xl rounded-lg' placeholder='Search..'/>
                        <div className='border-l-2 border-gray-300 flex justify-center items-center h-[40px] w-[150px]'>
                            <button className='font-semibold text-gray-900'>Search</button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mb-4 pb-10 border-b-2 border-gray-300'>
                    <div>
                        <div className='text-4xl font-bold flex justify-center mb-5'>View products</div>
                        <div className='text-gray-800/50'>10,000+ outstanding search center work, designs, illustrations, and graphic elements</div>
                        <div className='text-gray-800/50 flex justify-center'>10,000+ outstanding search center work</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Search