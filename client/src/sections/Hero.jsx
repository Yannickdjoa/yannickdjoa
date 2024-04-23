import React, { useRef } from 'react';
import yannickimage from '../assets/yannickimage.png';
import { TypeAnimation } from 'react-type-animation';
import { RiDownload2Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import ButtonCv from '../components/ButtonCv';

function Hero() {
  return (
    <div id="hero" className="h-[120vh] mx-auto md:mt-4">
      <div>
        <h2 className="text-emerald-600 text-xl md:text-2xl text-center font-bold my-2 md:my-6">
          _ About me
        </h2>
      </div>
      <div className="flex md:flex-row">
        <div className=" md:w-[50%] p-6 md:p-12  ">
          <h1 className="text-white text-2xl md:text-5xl font-semibold">
            Hey there, I'm Yannick
          </h1>
          <p className="text-xl md:text-3xl text-yellow-400 my-2 md:my-6">
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
          <p className="text-white text-sm md:text-xl mt-2 md:mt-6 text-justify">
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

        <div className="md:w-[50%] p-2 md:p-12 mt-2 md:mt-16">
          <img src={yannickimage} className="object-fill" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
