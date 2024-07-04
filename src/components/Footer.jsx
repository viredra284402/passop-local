import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className='bg-gray-900 text-white py-4 md:py-2 mt-6'> {/* Adjusted padding and margin for responsiveness */}
                <div className='container mx-auto px-6 md:px-4'> {/* Added responsive padding */}
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div className='mb-4 md:mb-0 text-center md:text-left'> {/* Center text on small screens */}
                            <div className="text-white text-xl md:text-2xl font-bold"> {/* Adjusted font size for responsiveness */}
                                <span className='text-green-700'>&lt;</span>
                                Pass
                                <span className='text-green-700'>OP/&gt;</span>
                            </div>
                            <p className='text-gray-400'>© 2024 PassOP. Created with Heart by Virendra Pal.</p>
                        </div>
                        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'> {/* Adjusted spacing for responsiveness */}
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <button className='flex items-center justify-center px-4 py-2 text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 rounded-md'>
                                    <img className='invert w-5 md:w-7' src="icons/git.svg" alt="github logo" /> {/* Adjusted icon size for responsiveness */}
                                    <span className='ml-2'>GitHub</span>
                                </button>
                            </a>
                            {/* Add more social icons/buttons here if needed */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
