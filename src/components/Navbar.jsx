import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-800 px-6 md:px-40 py-4"> {/* Added responsive padding */}
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl md:text-2xl font-bold"> {/* Added responsive text size */}
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </div>
        <button className='flex items-center justify-center px-3 py-1 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 rounded-md'>
          <img className='invert w-5 md:w-7' src="icons/git.svg" alt="github logo" /> {/* Added responsive icon size */}
          <span className='ml-2 font-medium'>GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
