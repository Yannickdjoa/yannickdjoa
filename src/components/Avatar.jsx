import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllWebIntro } from '../redux/slices/webIntroSlice';
import world from '../../public/world.png';
import boat from '../assets/boat.mp4';
function Avatar() {
  const { webIntroData } = useSelector(selectAllWebIntro);
  return (
    <video
      alt="avatar"
      className="hidden xl:flex h-[100vh] w-full object-cover spin-slow rounded-l-full"
      autoPlay
      muted
      loop
      src={webIntroData.captionImg}
      type="video/mp4"
    />
  );
}

export default Avatar;
