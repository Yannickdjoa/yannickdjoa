import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

function NewProjects() {
  return (
    <div>
      <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center text-center">
        <h1 className="text-6xl text-emerald-700 font-bold">
          Do you have a project?
        </h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
            viewBox="0 0 300 300"
            className="w-64 h-64 md:w-[300px] md:h-[300px]"
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#a3a3a3">
              <textPath
                xlinkHref="#circlePath"
                className="animate-spin-slow h-full w-full max-w-16 max-h-16"
              >
                . Full-stack developer . Operations manager .{' '}
                <tspan fill="#ca8a04">Hire Me</tspan>
              </textPath>
            </text>
          </motion.svg>
          <Link
            to="/contact"
            className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto text-white rounded-full flex flex-col items-center justify-center"
          >
            <FaArrowRight className="absolute text-4xl text-yellow-600 group-hover:translate-x-2 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewProjects;
