import React, { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

function ScrollToTop() {
  const [showScrollTopButton, setshowScrollTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setshowScrollTopButton(true);
      } else {
        setshowScrollTopButton(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-5 bg-neutral-700 rounded-xl md:h-16 md:w-16 p-1 md:p-2 cursor-pointer hover:bg-yellow-600 border-2 "
        >
          <FaArrowCircleUp className="text-yellow-600 hover:text-neutral-600 md:h-12 md:w-12" />
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
