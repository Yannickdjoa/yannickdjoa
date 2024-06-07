import React, { useEffect } from 'react';
import Hero from '../../sections/Hero';
import Skills from '../../sections/Skills';
import Experience from '../../sections/Experience';
import { useDispatch, useSelector } from 'react-redux';
import {
  startGettingHeroList,
  errorGettingHeroList,
  setHeroList,
  selectAllHeroList,
} from '../../redux/slices/heroSlice';
import {
  setExperiencesList,
  startSettingExperiencesList,
  failedToSetExperiencesList,
  selectAllExperiences,
} from '../../redux/slices/experienceSlice.js';
import {
  setStacksList,
  getStackListStart,
  getStackListFailure,
  selectAllStacks,
} from '../../redux/slices/stackSlice.js';
import { selectAlltextsList } from '../../redux/slices/textsSlice.js';

function About() {
  const dispatch = useDispatch();
  const { textsList } = useSelector(selectAlltextsList);
  const { heroList } = useSelector(selectAllHeroList);
  const { experiencesList } = useSelector(selectAllExperiences);
  const { stacksList } = useSelector(selectAllStacks);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const getHeroList = async () => {
    dispatch(startGettingHeroList(true));
    try {
      const response = await fetch(`${baseUrl}/api/aboutMe/get/1716617407911`);
      const data = await response.json();
      if (data.status === 'success') {
        dispatch(setHeroList(data.data));
        dispatch(errorGettingHeroList(false));
        dispatch(startGettingHeroList(false));
      }
    } catch (error) {
      dispatch(errorGettingHeroList(true));
      dispatch(startGettingHeroList(false));
    }
  };
  const experienceData = async () => {
    dispatch(startSettingExperiencesList(true));
    try {
      const response = await fetch(`${baseUrl}/api/experiences/get`);
      const data = await response.json();

      if (data.status === 'success') {
        dispatch(setExperiencesList(data.data));
        dispatch(failedToSetExperiencesList(null));
        dispatch(startSettingExperiencesList(false));
      }
    } catch (error) {
      dispatch(failedToSetExperiencesList(null));
      dispatch(startSettingExperiencesList(true));
      console.log(error);
    }
  };
  const stacksData = async () => {
    dispatch(getStackListStart(true));
    try {
      const response = await fetch(`${baseUrl}/api/stacks/getAll`);
      const data = await response.json();

      if (data.status === 'success') {
        dispatch(setStacksList(data.data));
        dispatch(getStackListFailure(null));
        dispatch(getStackListStart(false));
      }
    } catch (error) {
      dispatch(getStackListFailure(null));
      dispatch(getStackListStart(true));
      console.log(error);
    }
  };
  useEffect(() => {
    getHeroList();
    experienceData();
    stacksData();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2 className="title  text-emerald-700  my-2 md:my-4">
          {textsList.aboutTitle}
        </h2>
      </div>
      {heroList && <Hero />}
      {stacksList && <Skills />}
      {experiencesList && <Experience />}
    </div>
  );
}

export default About;
