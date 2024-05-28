import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bio } from '../data/Database';
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaTelegramPlane,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectAllBioDataList } from '../redux/slices/bioSlice';

function Footer() {
  const { bioDataList } = useSelector(selectAllBioDataList);
  return (
    <div className="flex flex-col md:flex-row bg-zinc-800 mt-24 h-28 md:h-36 gap-4 md:gap-8">
      <div className="flex flex-row justify-center gap-8 md:gap-12 items-center">
        <div className="flex">
          <h1 className=" uppercase font-bold text-lg m:text-3xl text-white ml-1 md:ml-4 mr-4 md:mr-32 ">
            <NavLink to="/">
              <span className="text-emerald-700">Y</span> DJOA
            </NavLink>
          </h1>
        </div>

        <div className="flex flex-col justify-center  my-1 md:my-10">
          <div className="flex mt-2 md:mt-8  justify-center">
            <h1 className="text-emerald-700 text-center text-sm md:text-xl font-bold ">
              _ Follow Me
            </h1>
          </div>

          <div className="flex flex-row gap-1 md:gap-4 mx-4 md:mx-24 my-2 md:my-6">
            <div className="btnFooter group">
              <NavLink
                to={bioDataList.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="footerIcon" />
              </NavLink>
            </div>
            <div className="btnFooter group">
              <NavLink
                to={bioDataList.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="footerIcon" />
              </NavLink>
            </div>
            <div className="btnFooter group">
              <NavLink
                to={bioDataList.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="footerIcon" />
              </NavLink>
            </div>
            <div className="btnFooter group">
              <NavLink
                to={bioDataList.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="footerIcon" />
              </NavLink>
            </div>
            <div className="btnFooter group">
              <NavLink
                to={bioDataList.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane className="footerIcon" />
              </NavLink>
            </div>
            <div className="btnFooter group">
              <NavLink
                to={bioDataList.tikTok}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="footerIcon" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-2 md:items-end mb-2 md:mb-4">
        <p className="text-white text-xs md:text-xl">
          Copyright © 2024 Yannick Djoa. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
