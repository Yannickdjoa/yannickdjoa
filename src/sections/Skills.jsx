import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {  Pagination, Navigation } from 'swiper/modules';
import SkillCard from '../components/SkillCard';
import { selectAllStacks } from '../redux/slices/stackSlice';
import { useSelector } from 'react-redux';
import { selectAlltextsList } from '../redux/slices/textsSlice';

function Skills() {
  SwiperCore.use([Navigation, Pagination]);
  const { stacksList } = useSelector(selectAllStacks);
  const { textsList } = useSelector(selectAlltextsList);
  const groupedstacksList = stacksList.reduce((acc, currentItem) => {
    (acc[currentItem.category] = acc[currentItem.category] || []).push(
      currentItem
    );
    return acc;
  }, {});

  return (
    <div
      id="skills"
      className=" flex flex-col justify-center relative items-center w-[100%] gap-12"
    >
      <div className="relative flex flex-col justify-between items-center  ">
        <h1 className="title text-emerald-700  ">{textsList.skillsTitle}</h1>
        <p className="text-lg md:text-lg text-neutral-400  text-center md:max-w-[600px] mx-2">
          {textsList.skillsSubtitle}
        </p>
      </div>
      <section className="w-full flex flex-wrap mt-4 gap-4 justify-center">
        {Object.keys(groupedstacksList).map((category) => (
          <div
            className="w-full max-w-[330px] md:max-w-[500px] bg-zinc-800 shadow-lg shadow-neutral-400 rounded-2xl  p-2 md:p-4 "
            key={category}
          >
            <h2 className="text-2xl font-bold text-white  text-center">
              {category}
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {stacksList.length > 0 ? (
                <Swiper
                  spaceBetween={32}
                  effect={'flip'}
                  grabCursor={true}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                >
                  {groupedstacksList[category].map((stack) => (
                    <SwiperSlide key={stack.stackId}>
                      <SkillCard stack={stack} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p>No stacks for this project</p>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Skills;
