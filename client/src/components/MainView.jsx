import React from 'react';

import greenimage from '../assets/greenimage.png';

function MainView() {
  return (
    <div className="bg-zinc-800 h-[120vh]  mx-auto flex flex-col md:flex-row">
      <div className="size-full md:w-[50%] p-6 md:p-12 flex flex-col">
        <p className="text-2xl md:text-5xl  text-left">
          <span className="text-white">You need to level-up</span>
          <br />
          <span className="text-emerald-400">
            your Tech Team with a different profile
          </span>
          <br />
          <span className="text-yellow-400">
            that have business operations experience
          </span>
          <br />
          <span className="text-white">and full-stack development skills?</span>
          <br />
        </p>
        <p className="text-neutral-400 text-2xl">
          Welcome to my dev. world where I give my all to satisfy any business
          needs that meets my skills
        </p>
        <div className="m-16">
          <a
            href="/"
            className="bg-yellow-400 opacity-90 text-neutral-500 p-4 text-center font-bold rounded-2xl  hover:bg-emerald-400"
          >
            Hire me
          </a>
        </div>
        {/* <button className="btn btn-sm  bg-yellow-400 opacity-90 text-neutral-500 p-4 text-center font-bold rounded-2xl  hover:bg-emerald-400 m-4 md:m-16">
          Hire me
        </button> */}
      </div>
      <div className="size-full md:w-[50%] p-6 md:p-12">
        <img src={greenimage} />
      </div>
    </div>
  );
}

export default MainView;
