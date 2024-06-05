import React from 'react';
import MessageForm from '../../components/MessageForm';
import { MdEmail, MdOutlinePhonePaused } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { selectAllBioDataList } from '../../redux/slices/bioSlice';
import { selectAlltextsList } from '../../redux/slices/textsSlice';

function Contact() {
  const { bioDataList } = useSelector(selectAllBioDataList);
  const { textsList } = useSelector(selectAlltextsList);
  return (
    <div id="contacts" className="flex flex-col ">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center max-w-[1100px] gap-4 md:gap-8 my-2 md:my-8">
          <h1 className="text-emerald-700 title">{textsList.contactTitle}</h1>
          <p className="text-sm md:text-lg text-neutral-400  text-center md:max-w-[600px]">
            {textsList.contactSubtitle}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row bg-zinc-800 mx-10 mb-4 rounded-3xl">
        <div className="flex flex-col  px-6 md:px-12  md:justify-top md:mr-32 mt-0 md:mt-12">
          <h1 className="flex justify-center md:justify-top m-4 md:m-12 text-white text-2xl font-semibold">
            Contacts
          </h1>
          <p className="flex flex-col gap-6">
            <span className="flex flex-row gap-2 items-center ml-4 text-neutral-400 ">
              <MdOutlinePhonePaused /> : <span>{bioDataList.telephone}</span>
            </span>

            <span className="flex flex-row gap-2 items-center ml-4 text-neutral-400">
              <MdEmail /> : <span>{bioDataList.email}</span>
            </span>
          </p>
        </div>
        <div className=" w-full md:w-[50%] p-6 md:p-12  ">
          <MessageForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;
