import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import ButtonCv from '../components/ButtonCv';
import ProfileImage from '../components/ProfileImage';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/variants';
import { useSelector } from 'react-redux';
import { selectAllHeroList } from '../redux/slices/heroSlice';
import { selectAlltextsList } from '../redux/slices/textsSlice';

function Hero() {
  const { heroList } = useSelector(selectAllHeroList);
  const { textsList } = useSelector(selectAlltextsList);
  return (
    <div id="hero" className="h-[120vh] md:h-[100vh] mx-auto md:mt-2">
      <div>
        <h2 className="title  text-emerald-700  my-2 md:my-4">
          {textsList.aboutTitle}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-12 md:gap-16 md:h-full py-4">
        {/* {heroList && */}
        <div className=" p-6 md:p-12 w-full md:w-[60%] ">
          <h1 className="h1 text-white">{heroList.aboutCaption}</h1>
          <p className="p text-xl md:text-3xl font-semibold text-emerald-700 my-2 md:my-6">
            <span className="text"></span>
            <TypeAnimation
              sequence={[
                heroList.aboutsubtitle1,
                1000,
                heroList.aboutsubtitle2,
                1000,
                heroList.aboutsubtitle3,
                1000,
                heroList.aboutsubtitle4,
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
          <p className="p text-sm md:text-xl mt-2 md:mt-6 text-justify">
            <span>{heroList.aboutTextParag1}</span>
            <br />
            <span>{heroList.aboutTextParag2}</span>
            <br />
            <span>{heroList.aboutTextParag3}</span>
          </p>
          <ButtonCv />
        </div>
        <motion.div
          variants={fadeIn('left', 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="basis-2/4 z-10  flex justify-center md:order-2"
        >
          <ProfileImage />
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
