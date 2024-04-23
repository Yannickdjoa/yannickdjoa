import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { navigationData } from '../data/Database';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ButtonGeneral from '../components/ButtonGeneral';
import Logo from '../components/Logo';

function Header() {
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);
  return (
    <div className="bg-zinc-800 h-[100px] text-white flex mx-auto items-center justify-between md:sticky md:top-0 md:z-20 border-b-2">
      <Logo />
      <Navbar />
      <ButtonGeneral />
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

        <ul className=" ml-4 mt-4">
          <li className="p-2">
            {navigationData.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className="flex flex-col p-2 text-lg  hover:text-emerald-700 hover:underline hover:underline-offset-8"
              >
                {item.name}
              </NavLink>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
