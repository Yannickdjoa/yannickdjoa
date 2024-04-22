import React, { useRef } from 'react';
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
          <motion.h1
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 text-white z-10"
          >
            Make anything possible
            <br />
            with{''}
            <span className="text-emerald-700"> web development</span>
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn('down', 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="p text-xl max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 z-10"
          >
            You need to level-up your Tech Team with a different profile that
            have business operations experience and full-stack development
            skills? Welcome to my software development's world. click below link
            to check my previous works.
          </motion.p>
          {/* button on small screens */}
          <div className="flex justify-center xl:hidden relative ">
            <ProjectButton />
          </div>
          {/* button bigger screens */}
          <motion.div
            variants={fadeIn('down', 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <ProjectButton />
          </motion.div>
        </div>
      </div>
      {/* images of hero section */}
      <div className="w-[1200px] h-full absolute right-0 bottom-0">
        {/* background image */}
        <div className="bg-none xl:bg-world xl:bg-cover xl:bg-no-repeat xl:bg-right h-full w-full absolute mix-blend-color-dodge translate-z-0"></div>
        {/* hero image */}
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full h-full max-w-[637px] max-h-[578px] absolute -bottom-40  lg:right-[2%] translate-z-0"
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
}

export default MainView;
