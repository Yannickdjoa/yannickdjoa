import React, { useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

function Navbar() {
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);

  const scrollToSection = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    const location = document.querySelector(target).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 64,
    });
  };

  return (
    <div className="bg-zinc-800 h-[100px] text-white flex mx-auto items-center justify-between sticky top-0 z-20">
      <h1
        onClick={scrollToSection}
        className="uppercase font-bold text-3xl ml-4 mr-32 cursor-pointer"
      >
        <a href="#mainview">
          <span className="text-emerald-400">Y</span> DJOA
        </a>
      </h1>
      <ul className="hidden md:flex ">
        <li
          onClick={scrollToSection}
          className=" p-5 underline underline-offset-8 hover:text-emerald-400 cursor-pointer"
        >
          <a href="#about">About</a>
        </li>
        <li
          onClick={scrollToSection}
          className="p-5 underline underline-offset-8 hover:text-emerald-400 cursor-pointer"
        >
          <a href="#skills">Skills</a>
        </li>
        <li
          onClick={scrollToSection}
          className="p-5 underline underline-offset-8 hover:text-emerald-400 cursor-pointer"
        >
          <a href="#experience">Experience</a>
        </li>
        <li
          onClick={scrollToSection}
          className="p-5 underline underline-offset-8 hover:text-emerald-400 cursor-pointer"
        >
          <a href="#projects">Projects</a>
        </li>
        <li
          onClick={scrollToSection}
          className="p-5 underline underline-offset-8 hover:text-emerald-400 cursor-pointer"
        >
          <a href="#contacts">Contacts</a>
        </li>
      </ul>

      <div className="bg-yellow-400 opacity-90 text-neutral-500 font-bold rounded-2xl p-2 mr-4 hover:bg-emerald-400">
        <button>Hire me</button>
      </div>
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
            <a href="#Connect">Let's Connect</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;