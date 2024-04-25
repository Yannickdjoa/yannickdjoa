import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import ButtonCv from '../components/ButtonCv';
import ProfileImage from '../components/ProfileImage';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/variants';

function Hero() {
  return (
    <div id="hero" className="h-[120vh] md:h-[100vh] mx-auto md:mt-2">
      <div>
        <h2 className="title  text-emerald-700  my-2 md:my-4">_ About me</h2>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-12 md:gap-16 md:h-full py-4">
        <div className=" p-6 md:p-12 w-full md:w-[60%] ">
          <h1 className="h1 text-white">Hey there, I'm Yannick</h1>
          <p className="p text-xl md:text-3xl font-semibold text-emerald-700 my-2 md:my-6">
            <span className="text"></span>
            <TypeAnimation
              sequence={[
                'JavaScript fullstack developper',
                1000,
                'Front-End developer with React full knowledge',
                1000,
                'Back-End developer for SQL and NO-SQL databases',
                1000,
                'WebDesigner using TailwindCss and basic CSS',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
          <p className="p text-sm md:text-xl mt-2 md:mt-6 text-justify">
            <span>
              I've been immersed in the world of software development since
              September 2022. My passion lies in developing full functional apps
              front-end and back-end.
            </span>
            <br />
            <span>
              I'm in a mission to support my clients/employer to create fully
              functional applications, visually stunning and high functionning
              websites. combining my skills in front-end development with solid
              backend understanding, I strive for nothing short of digital
              excellence.
            </span>
            <br />
            <span>
              Curious about my work ? Take a peak at my portfolio and skills.
              I'm proud to showcase what I've created. And hey, if you have any
              question or just want to chat, feel free to reach out. I'm all
              yours.
            </span>
          </p>
          <ButtonCv />
        </div>
        {/* <div className=" h-full absolute  bottom-0 right-0 w-full md:w-[50%]"> */}
        <motion.div
          variants={fadeIn('left', 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="basis-2/4 z-10  flex justify-center md:order-2"
        >
          <ProfileImage />
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
