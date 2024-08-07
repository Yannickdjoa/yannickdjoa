import React from 'react';
import { NavLink } from 'react-router-dom';
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
import { selectAlltextsList } from '../redux/slices/textsSlice';
import Logo from '../components/Logo';

function Footer() {
  const { bioDataList } = useSelector(selectAllBioDataList);
  const { textsList } = useSelector(selectAlltextsList);
  return (
    <div className=" flex flex-col md:flex-row justify-between bottom-0 items-center  bg-zinc-800 mt-4 md:mt-24 h-28 md:h-60 gap-2 md:gap-8  p-1 md:p-4 w-full">
      <div className="flex flex-row justify-center md:gap-4 items-center">
        <div className="hidden md:flex">
          <Logo />
        </div>

        <div className="flex flex-col items-center md:items-start  my-1 md:my-10">
          <div className="flex mt-2 md:mt-8  justify-center">
            <h1 className="text-emerald-700 text-center text-sm md:text-xl font-bold ">
              {textsList.footerSocialTitle}
            </h1>
          </div>

          <div className="flex flex-row gap-2 md:gap-4 mx-4 md:mx-24 my-2 md:my-6">
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
      <div className="flex flex-col md:gap-8 items-center justify-center">
        <NavLink
          to="/adminLogin"
          className="btn w-52 text-center hidden md:flex "
        >
          Admin Dashboard
        </NavLink>
        <div className="flex justify-end mr-2 md:items-end mb-2 md:mb-4">
          <p className="text-white text-xs md:text-xl">{textsList.copyright}</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
