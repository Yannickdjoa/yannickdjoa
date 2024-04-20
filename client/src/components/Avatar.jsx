import React from 'react';
import technobg from '../assets/technobg.png';

function Avatar() {
  return (
    <div className="hidden xl:flex xl:max-w-none">
      <img
        src={technobg}
        width={737}
        height={678}
        alt="avatar"
        className="translate-z-0 w-full h-full rounded-full "
      />
    </div>
  );
}

export default Avatar;
