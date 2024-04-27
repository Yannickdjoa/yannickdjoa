import React, { useRef, useState } from 'react';
import Projects from '../sections/Projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeIn } from '../utils/variants';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/Database';
import NewProjects from '../components/NewProjects';

function Portfolio() {
  const [toggle, setToggle] = useState('all');
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const x = useTransform(scrollYProgress, [0, 1], ['15%', '-95%']);
  return (
    <motion.div
      initial={{ y: '-200vh' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1 }}
      className="h-full "
    >
      <div ref={ref} className=" h-[600vh]">
        <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
          <div className="flex flex-col justify-center max-w-[1100px] gap-6 md:gap-12 my-6 md:my-12">
            <h1 className="title text-emerald-700">_ My Portfolio</h1>
            <p className="text-sm md:text-lg text-neutral-400  text-center md:max-w-[600px]">
              I have worked on a wide range of projects. From web apps to
              android apps. Here are some of my projects.
            </p>
          </div>
        </div>

        <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden  ">
          <motion.div style={{ x }} className="flex">
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
        </div>
      </div>
      <NewProjects />
    </motion.div>
  );
}

export default Portfolio;

// return (
//     <motion.div className="flex flex-col justify-center ">
//       <div ref={ref} className='relative h-[600vh]'>
//         <div className="flex justify-center">
//           <div className="flex flex-col justify-center max-w-[1100px] gap-6 md:gap-12 my-6 md:my-12">
//             <h1 className="title text-emerald-700">_ My Portfolio</h1>
//             <p className="text-sm md:text-lg text-neutral-400  text-center md:max-w-[600px]">
//               I have worked on a wide range of projects. From web apps to
//               android apps. Here are some of my projects.
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-col my-2">
//           <Projects />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default Portfolio;
//  <div className="flex flex-col my-2">
//    <Projects />
//  </div>;

{
  /* <div id="projects">
        <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
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
        </div> */
}

//  {
//    toggle === toggle &&
//      projects
//        .filter((item) => item.category === toggle)
//        .map((project, id) => (
//          <ProjectCard key={id} project={project} />
//        ));
//  }
