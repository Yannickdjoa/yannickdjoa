import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <div className="lg:mx-36 w-[340px] md:w-screen flex flex-col gap-2 md:gap-8 bg-zinc-800 shadow-lg shadow-neutral-400 rounded-2xl p-1 md:p-4">
      <div className="flex flex-col justify-center items-center pb-2 md:pb-8">
        <h1 className="font-bold text-xl md:text-4xl text-white max-w-full overflow-hidden">
          {project.title}
        </h1>
        <p className="text-neutral-400 text-xs md:text-lg font-normal ml-0.5 ">
          {project.period}
        </p>
      </div>
      <div className="flex flex-row justify-center items-start gap-2 md:gap-8">
        <div className="flex justify-center rounded-lg">
          <img
            src={project.projectImg}
            alt="image not available"
            className="object-cover h-40 md:h-52 w-36 md:w-[500px] rounded-lg "
          />
        </div>
        <div className="w-40 md:w-[600px]  ">
          <div className="flex justify-start">
            <p className="flex flex-wrap gap-1 md:gap-2 mt-1  ">
              {project.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="line-clamp-1 font-normal text-xs md:text-lg text-white"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>

          <div className=" flex flex-col  justify-start py-4 md:py-8">
            <p className="text-neutral-400 text-xs md:text-lg font-normal justify-start line-clamp-5 max-w-lg">
              {project.description}
            </p>
          </div>
          <div className="flex flex-row  justify-start gap-4 md:gap-24 ">
            <Link
              to={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 md:gap-4 items-center bg-yellow-600 text-neutral-700 px-2 md:px-6 md:py-1 text-center font-bold rounded-2xl  hover:bg-yellow-600/80 justify-center"
            >
              <FaGithub />
              Code
            </Link>
            <Link
              to={project.appLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 md:gap-4 items-center bg-yellow-600 text-neutral-700 p-2 md:p-4 text-center font-bold rounded-2xl  hover:bg-yellow-600/80 justify-center"
            >
              Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
