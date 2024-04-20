import React from 'react';
import { Link } from 'react-router-dom';
import rounded-text from '../assets/rounded-text.png';

function ProjectButton() {
  return (
    <div className="mx-auto xl:mx-0">
      <Link
        to="/projects"
        className="relaive w-44 h-44 flex justify-center items-center bg-circleStar bg-cover bg-no-repeat bg-center group "
      >
        <img href={rounded-text} />
      </Link>
    </div>
  );
}

export default ProjectButton;
