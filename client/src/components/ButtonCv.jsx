import React from 'react';
import { RiDownload2Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { selectAllBioDataList } from '../redux/slices/bioSlice';
import { useSelector } from 'react-redux';

function ButtonCv() {
  const { bioDataList } = useSelector(selectAllBioDataList);
  const resume = bioDataList.resume;
  const openFileInNewTab = (url) => {
    window.open(url, '_blank');
  };
  return (
    <div className="mx-16 md:mx-36 my-6">
      <button
        onClick={() => openFileInNewTab(resume)}
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
