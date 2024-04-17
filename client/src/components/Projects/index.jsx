import React, { useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/Database';

function Projects() {
  const [toggle, setToggle] = useState('all');
  const projectsRef = useRef(null);

  return (
    <div
      id="projects"
      className=" flex flex-col justify-center relative z-1 m-2 md:m-10"
    >
      <div className="flex justify-center">
        <div className="flex flex-col justify-center max-w-[1100px] gap-6 md:gap-12 my-6 md:my-12">
          <h1 className="text-emerald-400 text-center text-xl md:text-4xl font-semibold  md:mt-3">
            _ Projects
          </h1>
          <p className="text-sm md:text-lg text-neutral-400  text-center md:max-w-[600px]">
            I have worked on a wide range of projects. From web apps to android
            apps. Here are some of my projects.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" cursor-pointer  flex border-2 border-neutral-400  rounded-lg text-base md:text-xl font-semibold m-2 md:m-4  text-neutral-400 text-center bg-zinc-800 shadow-lg shadow-neutral-400">
          {toggle === 'all' ? (
            <div
              className="text-cnter p-1 px-1 md:px-4 border-r-2 border-r-neutral-400"
              active="true"
              value="all"
              onClick={() => setToggle('all')}
            >
              All
            </div>
          ) : (
            <div
              className=" text-cnter p-1 px-1 md:px-4 border-r-2 border-r-neutral-400"
              active="true"
              value="all"
              onClick={() => setToggle('all')}
            >
              All
            </div>
          )}
          {toggle === 'web design' ? (
            <div
              className="text-cnter p-1 border-r-2 border-r-neutral-400"
              active="true"
              value="web design"
              onClick={() => setToggle('web design')}
            >
              Web Design
            </div>
          ) : (
            <div
              className="text-cnter p-1 border-r-2 border-r-neutral-400"
              active="true"
              value="web design"
              onClick={() => setToggle('web design')}
            >
              Web Design
            </div>
          )}
          {toggle === 'web app' ? (
            <div
              className="text-cnter p-1 border-r-2 border-r-neutral-400"
              active="true"
              value="web app"
              onClick={() => setToggle('web app')}
            >
              Fullstack Web-Apps
            </div>
          ) : (
            <div
              className="text-cnter p-1 border-r-2 border-r-neutral-400"
              active="true"
              value="web app"
              onClick={() => setToggle('web app')}
            >
              Fullstack Web-Apps
            </div>
          )}
          {toggle === 'android app' ? (
            <div
              className="text-cnter p-1 border-r-2 border-r-neutral-400"
              active="true"
              value="android app"
              onClick={() => setToggle('android app')}
            >
              Mobile Apps
            </div>
          ) : (
            <div
              className="text-cnter p-1 border-r-2 border-r-neutral-400"
              active="true"
              value="android app"
              onClick={() => setToggle('android app')}
            >
              Mobile Apps
            </div>
          )}
          {toggle === 'other projects' ? (
            <div
              className="text-cnter p-1 border-r-2 border-r-neutral-400"
              active="true"
              value="other projects"
              onClick={() => setToggle('other projects')}
            >
              Other Projects
            </div>
          ) : (
            <div
              className="text-cnter p-1 border-r-2 border-r-neutral-400"
              active="true"
              value="other projects"
              onClick={() => setToggle('other projects')}
            >
              Other Projects
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center p-10 items-center gap-6 m-4">
        {toggle === 'all' &&
          projects.map((project, id) => (
            <ProjectCard key={id} project={project} />
          ))}
        {toggle === toggle &&
          projects
            .filter((item) => item.category === toggle)
            .map((project) => <ProjectCard key={id} project={project} />)}
      </div>
    </div>
  );
}

export default Projects;
