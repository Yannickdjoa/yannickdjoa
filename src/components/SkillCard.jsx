import React from 'react';

function SkillCard({ stack }) {
  return (
    <div className="bg-zinc-800  rounded-lg text-xl text-neutral-400 md:text-2xl  p-12 md:p-20 flex flex-col items-center justify-center ">
      <img
        src={stack.stackImage}
        alt="skill logo"
        className="w-8 md:w-12 h-8 md:h-12 my-4"
      />
      <h3>{stack.stackName}</h3>
      <p>Knowledge: {stack.stackPercentage} %</p>
    </div>
  );
}

export default SkillCard;
