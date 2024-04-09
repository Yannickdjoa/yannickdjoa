import React from 'react';
import yannickimage from '../assets/yannickimage.png';
import greenimage from '../assets/greenimage.png';
import { TypeAnimation } from 'react-type-animation';
import { RiDownload2Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';

function About() {
  return (
    <div>
      <div className="h-[90vh] max-w-[1200px] mx-auto md:flex mt-6">
        <div className="size-full md:w-[50%] p-6 md:p-12 mt-16">
          <img src={yannickimage} />
        </div>
        <div className="size-full md:w-[50%] p-6 md:p-12  ">
          <h2 className="text-emerald-400 text-2xl text-left font-bold my-6">
            _About me
          </h2>
          <h1 className="text-white text-5xl font-semibold">
            Hey there, I'm Yannick
          </h1>
          <p className="text-3xl text-yellow-400 my-6">
            <span className="text"></span>
            <TypeAnimation
              sequence={[
                'JavaScript fullstack developper',
                1000,
                'Front-End developer with React full knowledge',
                1000,
                'Back-End developer with knowledge of SQL and NO-SQL databases',
                1000,
                'WebDesigner using TailwindCss and basic CSS',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
          <p className="text-white text-xl mt-6">
            <span>
              I've been immersed in the world of software development since September
              2022. My passion lies in developing full functional apps front-end
              and back-end.
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
          <div className="m-16">
            <a
              href="/"
              className="flex gap-2 items-center bg-yellow-400 text-neutral-500 p-4 text-center font-bold rounded-2xl  hover:bg-emerald-400 justify-center"
            >
              <IconContext.Provider
                value={{ color: 'neutral', className: 'global-class-name' }}
              >
                <div>
                  <RiDownload2Fill />
                </div>
              </IconContext.Provider>
              MY CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
