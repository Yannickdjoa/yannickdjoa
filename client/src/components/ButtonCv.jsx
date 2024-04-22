import React from 'react';
import { RiDownload2Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { Bio } from '../data/Database';

const resume = Bio.resume;
function ButtonCv() {
  const downloadFileAtURL = (url) => {
    const fileName = url.split('/').pop();
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.setAttribute('download', fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  return (
    <div className="mx-16 md:mx-36 my-6">
      <button
        onClick={() => downloadFileAtURL(resume)}
        className="flex gap-4 items-center bg-yellow-600 text-neutral-700 p-4 text-center font-bold rounded-2xl  hover:bg-yellow-600/80 justify-center"
      >
        <IconContext.Provider
          value={{ color: 'neutral-700', className: 'global-class-name' }}
        >
          <div>
            <RiDownload2Fill />
          </div>
        </IconContext.Provider>
        MY CV
      </button>
    </div>
  );
}

export default ButtonCv;
