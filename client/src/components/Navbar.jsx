import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { navigationData } from '../data/Database';
import { NavLink } from 'react-router-dom';

function Navbar() {
 
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
        <li className="p-5">
          {navigationData.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className="p-3 text-lg  hover:text-emerald-700 cursor-pointer hover:underline hover:underline-offset-8"
            >
              {item.name}
            </NavLink>
          ))}
        </li>
      </ul>
      
    </div>
  );
}
export default Navbar;
