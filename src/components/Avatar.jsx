import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllWebIntro } from '../redux/slices/webIntroSlice';
function Avatar() {
  const { webIntroData } = useSelector(selectAllWebIntro);
  return (
    <div className="hidden xl:flex xl:max-w-none">
      <img
        src={webIntroData.captionImg}
        width={737}
        height={678}
        alt="avatar"
        className="translate-z-0 w-full h-full  rounded-b-full "
      />
    </div>
  );
}

export default Avatar;
