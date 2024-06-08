import React from 'react';
import { NavLink } from 'react-router-dom';

function Logo() {
  return (
    <h1 className="uppercase font-bold text-xl md:text-3xl ml-1 md:ml-4 mr-1 md:mr-32 cursor-pointer text-white">
      <NavLink to="/">
        <span className="text-emerald-700">Y</span> DJOA
      </NavLink>
    </h1>
  );
}

export default Logo;
