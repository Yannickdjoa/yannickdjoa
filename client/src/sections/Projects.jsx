import React, { useRef, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/Database';
import { motion } from 'framer-motion';

function Projects() {
  const [toggle, setToggle] = useState('all');

  return (
    <div id="projects">
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
      <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden  ">
        <motion.div className="flex">
          <div className="h screen w-screen flex items-center justify-center">
            {toggle === 'all' &&
              projects.map((project, id) => (
                <div key={id} className="flex items-center justify-center">
                  <ProjectCard project={project} />
                </div>
              ))}
            {toggle === toggle &&
              projects
                .filter((item) => item.category === toggle)
                .map((project, id) => (
                  <ProjectCard key={id} project={project} />
                ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Projects;

{
  /* <div className="flex flex-row flex-wrap justify-center p-10 items-center gap-6 m-4">
  <motion.div>
    <div>
      {toggle === 'all' &&
        projects.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      {toggle === toggle &&
        projects
          .filter((item) => item.category === toggle)
          .map((project, id) => <ProjectCard key={id} project={project} />)}
    </div>
  </motion.div>
</div>; */
}
