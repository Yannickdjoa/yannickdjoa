import React, { useRef } from 'react';
import { skillsSet } from '../data/Database';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
// import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/bundle';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';

function Skills() {
  SwiperCore.use([Navigation, Pagination]);
  return (
    <div
      id="skills"
      className=" flex flex-col justify-center relative z-1 items-center"
    >
      <div className="relative flex flex-col justify-between items-center w-[100%] max-w-[1100px] gap-12 ">
        <h1 className="text-emerald-400 text-center text-2xl md:text-4xl font-semibold  md:mt-3">
          _ My Skills
        </h1>
        <p className="text-lg md:text-lg text-neutral-400  text-center md:max-w-[600px] mx-2">
          Here are skills I have gain since the beginning of my journey as
          fullstack software developer.
        </p>

        <section className="w-full flex flex-wrap mt-8 gap-8 justify-center">
          {skillsSet.map((skillSet, index) => (
            <div
              className="w-full max-w-[330px] md:max-w-[500px] bg-zinc-800 shadow-lg shadow-neutral-400 rounded-2xl  p-2 md:p-4 "
              key={index}
            >
              <h2 className="text-2xl font-bold text-white mb-5 text-center">
                {skillSet.title}
              </h2>

              <div
                key={index}
                className="flex flex-wrap justify-center gap-3 mb-4"
              >
                <Swiper
                  spaceBetween={32}
                  slidesPerView={1}
                  effect={'flip'}
                  grabCursor={true}
                  pagination={true}
                  navigation={true}
                  modules={[EffectFlip, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {skillsSet[index].skills.map((item, index) => (
                    <SwiperSlide>
                      <div
                        key={index}
                        className="bg-zinc-800 border-solid border-2 border-neutral-400 rounded-lg text-xl text-neutral-400 md:text-2xl  p-2 md:p-8 flex flex-col items-center justify-center g-2"
                      >
                        <img
                          src={item.image}
                          alt="skill logo"
                          className="w-6 h-6"
                        />
                        <h3>{item.name}</h3>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Skills;
