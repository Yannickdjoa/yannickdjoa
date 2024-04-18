import React from 'react'

function SkillCard({stack}) {
  return (
    <div className="bg-zinc-800 border-solid border-2 border-neutral-400 rounded-lg text-xl text-neutral-400 md:text-2xl  p-2 md:p-8 flex flex-col items-center justify-center g-2">
      <img src={stack.image} alt="skill logo" className="w-6 h-6" />
      <h3>{stack.name}</h3>
    </div>
  );
}

export default SkillCard
