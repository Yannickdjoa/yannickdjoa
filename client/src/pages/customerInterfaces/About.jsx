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

function About() {
  const dispatch = useDispatch();
  const { heroList } = useSelector(selectAllHeroList);

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
  useEffect(() => {
    getHeroList();
  }, []);
  return (
    <div>
      {heroList && (
        <>
          <Hero />
          <Skills />
          <Experience />
        </>
      )}
    </div>
  );
}

export default About;
