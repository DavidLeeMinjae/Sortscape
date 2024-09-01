import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <div className="flex justify-center"> 
        <h1 className="text-4xl">Sortscape</h1>
      </div>
    </header>
  );
};

export default Header;
