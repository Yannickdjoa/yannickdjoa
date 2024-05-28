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
  getStackSuccess,
  getStackListFailure,
  selectAllStacks,
} from '../../redux/slices/stackSlice.js';

function About() {
  const dispatch = useDispatch();
  const { heroList } = useSelector(selectAllHeroList);
  const { experiencesList } = useSelector(selectAllExperiences);
  const { stacksList } = useSelector(selectAllStacks);

  const getHeroList = async () => {
    dispatch(startGettingHeroList(true));
    try {
      const response = await fetch('/api/aboutMe/get/1716617407911');
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
      const response = await fetch('/api/experiences/get');
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
      const response = await fetch('/api/stacks//getAll');
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
    <div>
      {heroList && <Hero />}
      {stacksList && <Skills />}
      {experiencesList && <Experience />}
    </div>
  );
}

export default About;
