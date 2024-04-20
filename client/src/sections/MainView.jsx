import React, { useRef } from 'react';
import greenimage from '../assets/greenimage.png';
import Avatar from '../components/Avatar';
import ProjectButton from '../components/ProjectButton';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/variants';
function MainView() {
  return (
    <div id="mainview" className="bg-primary/60 h-full ">
      {/* text area div */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:text-left xl:pt-40 h-full container mx-auto">
          {/* title */}
          <h1 className="h1 text-white">
            Welcome to my
            <br />
            apps{''}
            <span className="text-emerald-400"> developer world</span>
          </h1>
          {/* subtitle */}
          <p className="p text-xl max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16">
            You need to level-up your Tech Team with a different profile that
            have business operations experience and full-stack development
            skills? I'm here for you. click below link to check my previous
            work.
          </p>
          {/* button div */}
          <div className="flex justify-center  relative">
            <ProjectButton/>
          </div>
        </div>

        {/* <button className="btn btn-sm  bg-yellow-400 opacity-90 text-neutral-500 p-4 text-center font-bold rounded-2xl  hover:bg-emerald-400 m-4 md:m-16">
          Hire me
        </button> */}
      </div>
      <div className="size-full md:w-[50%] p-6 md:p-12">
        <img src={greenimage} />
      </div>
    </div>
  );
}

export default MainView;
