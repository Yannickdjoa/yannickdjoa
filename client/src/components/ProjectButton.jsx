import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectAllWebIntro } from '../redux/slices/webIntroSlice';

function ProjectButton() {
  const { webIntroData } = useSelector(selectAllWebIntro);
  return (
    <div className="mx-auto xl:mx-0 z-10">
      <Link
        to="/portfolio"
        className=" relaive w-32 h-32 flex justify-center items-center bg-circleStar bg-cover bg-no-repeat bg-center  group "
      >
        <img
          src={webIntroData.buttonImg}
          height={121}
          width={128}
          className="animate-spin-slow h-full w-full max-w-24 max-h-24"
        />
        <FaArrowRight className="absolute text-4xl text-yellow-600 group-hover:translate-x-2 transition-all duration-300" />
      </Link>
    </div>
  );
}

export default ProjectButton;
