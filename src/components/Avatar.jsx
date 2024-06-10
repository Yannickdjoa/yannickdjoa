import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllWebIntro } from '../redux/slices/webIntroSlice';
import world from '../../public/world.png';
import boat from '../assets/boat.mp4';
function Avatar() {
  // {webIntroData.captionImg}
  const { webIntroData } = useSelector(selectAllWebIntro);
  return (
    // <div className="hidden xl:flex xl:max-w-none">
    //   <img
    //     src={boat}
    //     width={737}
    //     height={737}
    //     alt="avatar"
    //     className="translate-z-0 w-full h-full rounded-full"
    //   />
    // </div>
    <video
      className="h-[100vh] w-full object-cover spin-slow rounded-l-full"
      autoPlay
      muted
      loop
    >
      <source src="src/assets/boat.mp4" type="video/mp4" />
    </video>
  );
}

export default Avatar;
