import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonGeneral() {
  const navigate = useNavigate();
  return (
    <div className="hidden md:flex opacity-90  font-bold rounded-2xl p-2 mr-4 md:mr-8 bg-yellow-600 hover:bg-yellow-600/80 text-neutral-700  border-2 cursor-pointer">
      <button onClick={(e) => navigate('/contact')}>Hire me</button>
    </div>
  );
}

export default ButtonGeneral;
