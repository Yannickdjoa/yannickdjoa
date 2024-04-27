import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <div className=" flex flex-col gap-8 bg-zinc-800 shadow-lg shadow-neutral-400 rounded-2xl p-12">
      <div className="flex flex-col justify-center items-center pb-8">
        <h1 className="font-bold text-xl md:text-2xl text-white max-w-full overflow-hidden">
          {project.title}
        </h1>
        <p className="text-neutral-400 text-xs font-normal ml-0.5 ">
          {project.date}
        </p>
      </div>
      <div className="flex flex-row gap-8">
        <div className="flex justify-center rounded-lg">
          <img
            src={project.image}
            alt="image not available"
            className="object-cover h-52 w-[400px] rounded-lg "
          />
        </div>
        <div className="w-[500px] ">
          <div className="flex justify-start ">
            <p className="flex flex-wrap gap-2 mt-1  ">
              {project.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="line-clamp-1 font-normal text-xs text-white"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>

          <div className=" flex flex-col  justify-start py-8">
            <p className="text-neutral-400 text-xs font-normal justify-start line-clamp-5 max-w-lg">
              {project.description}
            </p>
          </div>
          <div className="flex flex-row  justify-start gap-24 ">
            <Link
              to={project.github}
              className="flex gap-4 items-center bg-yellow-600 text-neutral-700 px-6 py-1 text-center font-bold rounded-2xl  hover:bg-yellow-600/80 justify-center"
            >
              <FaGithub />
              Code
            </Link>
            <Link
              to={project.webapp}
              className="flex gap-4 items-center bg-yellow-600 text-neutral-700 p-4 text-center font-bold rounded-2xl  hover:bg-yellow-600/80 justify-center"
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

// return (
//     <div className=" flex flex-col w-80 gap-4 p-2 border-2 border-neutral-400">
//       <div className="flex rounded-lg">
//         <img
//           src={project.image}
//           alt="image not available"
//           className="object-cover h-24 w-80 "
//         />
//       </div>
//       <div className="flex">
//         <p className="flex flex-wrap gap-2 mt-1 w-full ">
//           {project.tags?.map((tag, index) => (
//             <span
//               key={index}
//               className="line-clamp-1 font-normal text-xs text-yellow-400 bg-zinc-600 rounded-sm"
//             >
//               {tag}
//             </span>
//           ))}
//         </p>
//       </div>

//       <div className=" flex flex-col w-full gap-2">
//         <h1 className="font-semibold text-lg text-white max-w-full overflow-hidden">
//           {project.title}
//         </h1>
//         <p className="text-neutral-400 text-xs font-normal ml-0.5 ">
//           {project.date}
//         </p>
//         <p className="text-neutral-400 text-xs font-normal text-justify line-clamp-5">
//           {project.description}
//         </p>
//       </div>

//       <div className="flex flex-row items-center justify-center gap-32 ">
//         <a
//           href={project.github}
//           className="flex flex-row p-1  items-center gap-1 bg-yellow-400 rounded-lg hover:bg-emerald-400 font-semibold  text-neutral-400"
//         >
//           <FaGithub />
//           Code
//         </a>
//         <a
//           href={project.webapp}
//           className=" bg-yellow-400 rounded-lg  hover:bg-emerald-400 text-neutral-400 font-semibold p-1 "
//         >
//           Demo
//         </a>
//       </div>
//     </div>
//   );
// }

// export default ProjectCard;
