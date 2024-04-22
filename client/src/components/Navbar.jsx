import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { navigationData } from '../data/Database';

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);
  // const scrollToSection = (e) => {
  //   e.preventDefault();
  //   const target = e.target.getAttribute('href');
  //   const location = document.querySelector(target).offsetTop;

  //   window.scrollTo({
  //     left: 0,
  //     top: location - 64,
  //   });
  // };

  return (
    <div>
      <ul className="hidden md:flex ">
        <li  className="p-5">
          {navigationData.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="p-3 text-lg  hover:text-emerald-700 cursor-pointer hover:underline hover:underline-offset-8"
            >
              {item.name}
            </a>
          ))}
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <div
        className={
          nav
            ? 'fixed h-full left-o top-0 w-[50%] bg-zinc-600 ease-in-out duration-500'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className="uppercase font-bold text-1xl ml-4 mt-4">
          <a href="/">
            <span className="text-emerald-400">Y</span> DJOA
          </a>
        </h1>
        <ul className="ml-4 mt-4">
          <li className="p-2   hover:text-emerald-400">
            <a href="#About">About</a>
          </li>
          <li className="p-2   hover:text-emerald-400">
            <a href="#Skills">Skills</a>
          </li>
          <li className="p-2   hover:text-emerald-400">
            <a href="#Projects">Projects</a>
          </li>
          <li className="p-2  hover:text-emerald-400">
            <a href="#Connect">Contacts</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
