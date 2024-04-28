import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { navigationData } from '../data/Database';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <ul className="hidden md:flex">
        <li className="p-5 ">
          {navigationData.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) => {
                return (
                  'p-2  cursor-pointer hover:underline hover:underline-offset-4' +
                  (isActive
                    ? ' text-emerald-700 text-2xl font-bold '
                    : 'text-white text-lg font-semibold')
                );
              }}
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
