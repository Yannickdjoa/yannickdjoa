import React from 'react';
import Navbar from '../components/Navbar';
import ButtonGeneral from '../components/ButtonGeneral';
import Logo from "../components/Logo";

function Header() {
  return (
    <div className="bg-zinc-800 h-[100px] text-white flex mx-auto items-center justify-between sticky top-0 z-20 border-b-2">
      <Logo />
      <Navbar />
      <ButtonGeneral />
    </div>
  );
}

export default Header;
