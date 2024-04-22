import React from 'react';
import { RiDownload2Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { Bio} from '../data/Database';
function ButtonCv() {
    const resume = Bio.resume;
  return (
    
    <div className="mx-16 md:mx-36 my-6">
      <Link
        to={resume}
        className="flex gap-2 items-center bg-yellow-600 text-neutral-500 p-4 text-center font-bold rounded-2xl  hover:bg-emerald-400 justify-center"
      >
        <IconContext.Provider
          value={{ color: 'neutral', className: 'global-class-name' }}
        >
          <div>
            <RiDownload2Fill />
          </div>
        </IconContext.Provider>
        MY CV
      </Link>
    </div>
  );
}

export default ButtonCv;
