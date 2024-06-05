import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllHeroList } from '../redux/slices/heroSlice';
function ProfileImage() {
  const { heroList } = useSelector(selectAllHeroList);
  return (
    <div
      className="relative z-0 md:ml-20 md:before:absolute md:before:-top-20 md:before:-left-20 md:before:rounded-t-[400px]
            md:before:w-full  md:before:max-w-[600px] md:before:h-full md:before:border-2 md:before:border-neutral-400 md:before:z-[-1] md:before:bg-gradient-emerald-700"
    >
      <img
        alt="profile"
        className="hover:filter hover:saturate-200 transition duration-500 z-10 w-full max-w-[300px] md:max-w-[400px]  rounded-t-[400px] bg-gradient-to-r from-emerald-700 to-yellow-400"
        src={heroList.profileImg}
      />
    </div>
  );
}

export default ProfileImage;
