import React, { useRef } from 'react';
import { skills } from '../data/Database';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import SkillCard from '../components/SkillCard';

function Skills() {
  SwiperCore.use([Navigation, Pagination]);
  return (
    <div
      id="skills"
      className=" flex flex-col justify-center relative items-center"
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
          {skills.map((skill, index) => (
            <div
              className="w-full max-w-[330px] md:max-w-[500px] bg-zinc-800 shadow-lg shadow-neutral-400 rounded-2xl  p-2 md:p-4 "
              key={index}
            >
              <h2 className="text-2xl font-bold text-white mb-5 text-center">
                {skill.title}
              </h2>

              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {skills.length > 0 ? (
                  <Swiper
                    spaceBetween={32}
                    effect={'flip'}
                    grabCursor={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                  >
                    {skills[index].stacks.map((stack, stack_id) => (
                      <SwiperSlide key={stack_id}>
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
    </div>
  );
}

export default Skills;
