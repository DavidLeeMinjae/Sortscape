import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <div className="flex justify-between items-center"> 
        <div className="text-lg font-bold">SortScape</div>
        {/* Updated navigation div */}
        <div className={`absolute top-16 left-0 w-full justify-end bg-gray-800 p-4 md:static md:bg-transparent md:p-0 md:flex md:space-x-4 ${isOpen ? "block" : "hidden"}`}>
          <a href="https://google.ca" className="block py-2 md:py-0 hover:text-gray-400">About</a>
          <a href="https://www.khanacademy.org/computing/computer-science/algorithms" className="block py-2 md:py-0 hover:text-gray-400">Reference</a>
        </div>
        <div className="md:hidden"> 
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
