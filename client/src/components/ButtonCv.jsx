import React from 'react';
import { RiDownload2Fill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { Bio } from '../data/Database';
import { Link } from 'react-router-dom';
import { selectAllBioDataList } from '../redux/slices/bioSlice';
import { useSelector } from 'react-redux';

function ButtonCv() {
  const { bioDataList } = useSelector(selectAllBioDataList);
  const resume = bioDataList.resume;
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
      <Link
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
      </Link>
    </div>
  );
}

export default ButtonCv;
