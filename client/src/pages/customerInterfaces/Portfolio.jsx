import React, { useRef, useState } from 'react';
import Projects from '../../sections/Projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeIn } from '../../utils/variants';
import ProjectCard from '../../components/ProjectCard';
import { projects } from '../../data/Database';
import NewProjects from '../../components/NewProjects';

function Portfolio() {
  const [toggle, setToggle] = useState('all');
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const x = useTransform(scrollYProgress, [0, 1], ['17%', '-92%']);
  return (
    <motion.div
      initial={{ y: '-200vh' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1 }}
      className="h-full"
    >
      <div ref={ref} className=" h-[300vh] md:h-[600vh]">
        <div className="w-screen h-[calc(30vh-6rem)] md:h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
          <div className="flex flex-col justify-center max-w-[1100px] gap-6 md:gap-12 my-6 md:my-12">
            <h1 className="title text-emerald-700">_ My Portfolio</h1>
            <p className="text-sm md:text-lg text-neutral-400  text-center md:max-w-[600px]">
              I have worked on a wide range of projects. From web apps to
              android apps. Here are some of my projects.
            </p>
          </div>
        </div>

        <div className="sticky top-0 flex lg:h-screen gap-8 items-center lg:overflow-hidden  ">
          <motion.div style={{ x }} className="hidden lg:flex">
            <div className="flex items-center justify-center ">
              {projects.map((project, id) => (
                <div
                  key={id}
                  className="h-screen w-screen flex items-center justify-center"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </motion.div>
          <div className="flex flex-col lg:hidden">
            <div className="flex flex-col lg:flex-row items-center justify-center ">
              {projects.map((project, id) => (
                <div
                  key={id}
                  className=" w-screen py-8 px-2 flex items-center justify-center"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NewProjects />
    </motion.div>
  );
}

export default Portfolio;