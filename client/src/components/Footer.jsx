import React from 'react';
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaFacebookF,
} from 'react-icons/fa';

function Footer() {
  return (
    <div className="flex flex-col md:flex-row bg-zinc-800 mt-24 h-28 md:h-36 gap-4 md:gap-8">
      <div className="flex flex-row justify-center gap-12 items-center">
        <div className="flex  ">
          <h1 className=" uppercase font-bold text-lg m:text-3xl text-white ml-1 md:ml-4 mr-4 md:mr-32 ">
            <a href="/">
              <span className="text-emerald-400">Y</span> DJOA
            </a>
          </h1>
        </div>

        <div className="flex flex-col justify-center gap-2 md:gap-2 my-1 md:my-10">
          <div>
            <h1 className="text-emerald-400 text-center text-sm md:text-xl font-semibold md:mt-2">
              _ Let's Connect
            </h1>
          </div>

          <div className="flex flex-row gap-1 md:gap-4 mx-4 md:mx-24 mt-2 md:mt-6">
            <div className="bg-neutral-700 rounded-xl h-8 md:h-12 w-8 md:w-12 p-1 md:p-2 cursor-pointer hover:bg-yellow-400">
              <a>
                <FaLinkedinIn className="text-yellow-400 hover:text-neutral-600 h-6 md:h-8 w-6 md:w-8" />
              </a>
            </div>
            <div className="bg-neutral-700 rounded-xl h-8 md:h-12 w-8 md:w-12 p-1 md:p-2 cursor-pointer hover:bg-yellow-400">
              <a>
                <FaGithub className="text-yellow-400 hover:text-neutral-600 h-6 md:h-8 w-6 md:w-8" />
              </a>
            </div>
            <div className="bg-neutral-700 rounded-xl h-8 md:h-12 w-8 md:w-12 p-1 md:p-2 cursor-pointer hover:bg-yellow-400">
              <a>
                <FaTwitter className="text-yellow-400 hover:text-neutral-600 h-6 md:h-8 w-6 md:w-8" />
              </a>
            </div>
            <div className="bg-neutral-700 rounded-xl h-8 md:h-12 w-8 md:w-12 p-1 md:p-2 cursor-pointer hover:bg-yellow-400">
              <a>
                <FaYoutube className="text-yellow-400 hover:text-neutral-600 h-6 md:h-8 w-6 md:w-8" />
              </a>
            </div>
            <div className="bg-neutral-700 rounded-xl h-8 md:h-12 w-8 md:w-12 p-1 md:p-2 cursor-pointer hover:bg-yellow-400">
              <a>
                <FaFacebookF className="text-yellow-400 hover:text-neutral-600 h-6 md:h-8 w-6 md:w-8" />
              </a>
            </div>
            <div className="bg-neutral-700 rounded-xl h-8 md:h-12 w-8 md:w-12 p-1 md:p-2 cursor-pointer hover:bg-yellow-400">
              <a>
                <FaTiktok className="text-yellow-400 hover:text-neutral-600 h-6 md:h-8 w-6 md:w-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:items-end mb-2 md:mb-4">
        <p className="text-white text-xs md:text-xl">
          Copyright © 2024 Yannick Djoa. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
