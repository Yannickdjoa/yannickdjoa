import React, { useState } from 'react';
import { experiences } from '../data/Database';
import { useSelector } from 'react-redux';
import { selectAllExperiences } from '../redux/slices/experienceSlice';
import { selectAlltextsList } from '../redux/slices/textsSlice';

function Experience() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { experiencesList } = useSelector(selectAllExperiences);
  const { textsList } = useSelector(selectAlltextsList);
  return (
    <div
      id="experience"
      className=" flex flex-col justify-center relative m-2 md:m-10"
    >
      <div className="flex justify-center">
        <div className="flex flex-col justify-between items-center w-[100%] max-w-[1100px] gap-6 md:gap-12 my-6 md:my-12">
          <h1 className=" title text-emerald-700  md:mt-3">
            {textsList.experienceTitle}
          </h1>
          <p className="text-sm md:text-lg text-neutral-400  text center md:max-w-[600px]">
            {textsList.experienceSubtitle}
          </p>
        </div>
      </div>
      <div className=" bg-zinc-800 shadow-lg shadow-neutral-400 flex flex-col md:flex-row py-2 md:py-10 rounded-2xl ">
        <div className="border-l-1 md:border-l-2 border-[#1a7f5a1e]  flex flex-row md:flex-col gap-1 md:gap-10 w-full md:w-80">
          {experiencesList.map((experience, index) => (
            <div
              onClick={() => setSelectedItemIndex(index)}
              className="cursor-pointer "
              key={index}
            >
              <h1
                className={`text-xs md:text-xl px-1 md:px-5 ${
                  selectedItemIndex === index
                    ? 'bg-[#1a7f5a1e] text-[#008000b0] border-l-4 border-[#008000b0] font-semibold py-2 md:py-3 ml-1'
                    : 'text-white '
                }`}
                key={experience.experienceId}
              >
                {experience.date}
              </h1>
            </div>
          ))}
        </div>
        {experiencesList && selectedItemIndex ? (
          <div className="flex flex-col gap-4 md:gap-10  mx-1 md:mx-24 w-full md:w-4/5 mt-4 md:mt-12">
            <h1 className="text-yellow-400 text-lg md:text-2xl ">
              {experiencesList[selectedItemIndex].role}
            </h1>
            <div className="flex items-center gap-2 md:gap-6">
              <h1 className="text-white text-sm md:text-xl">
                {experiencesList[selectedItemIndex].company}
              </h1>
              <img
                src={experiencesList[selectedItemIndex].companyImage}
                className="h-12 w-12"
              />
            </div>
            <p className="text-white text-wrap ">
              {experiencesList[selectedItemIndex].description}
            </p>
            <ul className="items-center gap-1 md:gap-4 text-neutral-400 flex flex-row flex-wrap">
              {experiencesList[selectedItemIndex].skills.map((skill, index) => (
                <li
                  className=" pr-2 border-r-2  border-neutral-400"
                  key={index}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          'no data'
        )}
      </div>
    </div>
  );
}

export default Experience;
