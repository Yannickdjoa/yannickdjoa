import React from 'react';
import yannickpictureNb from '../assets/yannickpictureNb.png';
import yannickimage from '../assets/yannickimage.png';
function ProfileImage() {
  return (
    <div
      className="relative z-0 md:ml-20 md:before:absolute md:before:-top-20 md:before:-left-20 md:before:rounded-t-[400px]
            md:before:w-full  md:before:max-w-[600px] md:before:h-full md:before:border-2 md:before:border-neutral-400 md:before:z-[-1] md:before:bg-gradient-emerald-700"
    >
      <img
        alt="profile"
        className="hover:filter hover:saturate-200 transition duration-500 z-10 w-full max-w-[300px] md:max-w-[400px]  rounded-t-[400px] bg-gradient-to-r from-emerald-700 to-yellow-400"
        src={yannickpictureNb}
      />
    </div>
    // <div className="bg-none md:bg-profilePic md:bg-cover md:bg-no-repeat md:bg-right h-full w-full absolute  translate-z-0  ">
    //   {/* <img
    //     src={yannickpictureNb}
    //     className="hover:bg-emerald-800 object-fill h-[600px] w-[600px]"
    //   /> */}
    //   {/* flex items-center justify-center z-10 border-2 border-neutral-400 mx-2 */}
    // </div>
  );
}

export default ProfileImage;
