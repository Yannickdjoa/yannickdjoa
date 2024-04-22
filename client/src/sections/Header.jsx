import React from 'react';
import Navbar from '../components/Navbar';
import ButtonGeneral from '../components/ButtonGeneral';
import Logo from "../components/Logo";

function Header() {
  return (
    <div>
      <Logo />
      <Navbar />
      <ButtonGeneral />
    </div>
  );
}

export default Header;
