import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../components/Avatar';
import ProjectButton from '../components/ProjectButton';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/variants';
import {
  setWebIntroData,
  startSettingWebIntroData,
  failedToSetWebIntroData,
  selectAllWebIntro,
} from '../redux/slices/webIntroSlice';
import { useSelector, useDispatch } from 'react-redux';
function MainView() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { webIntroData } = useSelector(selectAllWebIntro);
  const dispatch = useDispatch();

  const getWebIntro = async () => {
    try {
      startSettingWebIntroData(true);
      const response = await fetch(`${baseUrl}/api/webIntro/get/1716567889750`);
      const data = await response.json();
      if (data.status === 'success') {
        dispatch(setWebIntroData({ ...data.data }));
        dispatch(failedToSetWebIntroData(false));
        dispatch(startSettingWebIntroData(false));
      }
    } catch (error) {
      dispatch(failedToSetWebIntroData(true));
      return error.message;
    }
  };
  useEffect(() => {
    getWebIntro();
  }, []);
  return (
    <div id="mainview" className="bg-primary/60 h-screen ">
      {/* text area div */}
      <div className="flex flex-col-reverse xl:flex-row items-center justify-between w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        {webIntroData && (
          <div className="text-center flex flex-col justify-center xl:text-left xl:pt-40 h-full container mx-auto">
            {/* title */}

            <motion.h1
              variants={fadeIn('down', 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h1 text-white z-10"
            >
              {webIntroData.mainCaption}
              <br />
              {webIntroData.secondaryCaption}
              <span className="text-emerald-700">
                {' '}
                {webIntroData.coloredCaption}
              </span>
            </motion.h1>
            {/* subtitle */}
            <motion.p
              variants={fadeIn('down', 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="p text-xl text-justify max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 z-10"
            >
              {webIntroData.introText}
            </motion.p>
            {/* button on small screens */}
            <div className="flex justify-center xl:hidden relative ">
              <ProjectButton />
            </div>
            {/* button bigger screens */}
            <motion.div
              variants={fadeIn('down', 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="hidden xl:flex"
            >
              <ProjectButton />
            </motion.div>
          </div>
        )}
      </div>
      {/* images of hero section */}
      <div className="w-[1200px] h-full absolute right-0 bottom-0">
        {/* background image */}
        <div className="bg-none xl:bg-world xl:bg-cover xl:bg-no-repeat xl:bg-right h-full w-full absolute mix-blend-color-dodge translate-z-0"></div>
        {/* hero image */}
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full h-full max-w-[537px] max-h-[478px] absolute -bottom-40  lg:right-[2%] translate-z-0"
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
}

export default MainView;
