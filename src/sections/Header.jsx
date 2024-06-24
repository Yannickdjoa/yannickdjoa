import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { navigationData } from '../data/Database';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ButtonGeneral from '../components/ButtonGeneral';
import Logo from '../components/Logo';
import Profile from '../components/Profile';
import { useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';

function Header() {
  const [nav, setNav] = useState(false);
  const { isAuthenticated } = useSelector(loginUser);

  const handleNav = () => setNav(!nav);
  return (
    <div className="bg-zinc-800 h-[100px] w-full text-white flex mx-auto items-center justify-between md:sticky md:top-0 md:z-20 border-b-2">
      <Logo />
      <Navbar />
      <div>{isAuthenticated ? <Profile /> : <ButtonGeneral />}</div>
      <div onClick={handleNav} className="block md:hidden z-20">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <div
        className={
          nav
            ? 'fixed h-full left-o top-0 w-[60%] bg-zinc-600 ease-in-out duration-500 z-20'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className="uppercase font-bold text-1xl ml-4 mt-4">
          <Link to="/">
            <span className="text-emerald-700">Y</span> DJOA
          </Link>
        </h1>

        <ul className=" ml-4 mt-4">
          <li className="p-2">
            {navigationData.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                onClick={(e) => handleNav()}
                className="flex flex-col p-2 text-lg gap-4"
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
