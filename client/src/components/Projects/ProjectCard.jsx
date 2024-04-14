import React from 'react';
import { FaGithub } from 'react-icons/fa';

function ProjectCard({ project }) {
  return (
    
      <div className=" flex flex-col w-80 gap-4 p-2 border-2 border-neutral-400">
        <div className="flex rounded-lg">
          <img
            src={project.image}
            alt="project image not available"
            className="object-cover h-24 w-80 "
          />
        </div>
        <div className="flex">
          <p className="flex flex-wrap gap-2 mt-1 w-full ">
            {project.tags?.map((tag, index) => (
              <span
                key={index}
                className="line-clamp-1 font-normal text-xs text-yellow-400 bg-zinc-600 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </p>
        </div>

        <div className=" flex flex-col w-full gap-2">
          <h1 className="font-semibold text-lg text-white max-w-full overflow-hidden">
            {project.title}
          </h1>
          <p className="text-neutral-400 text-xs font-normal ml-0.5 ">
            {project.date}
          </p>
          <p className="text-neutral-400 text-xs font-normal line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex flex-row items-center justify-center gap-32 ">
          <a
            href={project.github}
            className="flex flex-row p-1  items-center gap-1 bg-yellow-400 rounded-lg hover:bg-emerald-400 font-semibold  text-neutral-400"
          >
            <FaGithub />
            Code
          </a>
          <a
            href={project.webapp}
            className=" bg-yellow-400 rounded-lg  hover:bg-emerald-400 text-neutral-400 font-semibold p-1 "
          >
            Demo
          </a>
        </div>
      </div>
  );
}

export default ProjectCard;
