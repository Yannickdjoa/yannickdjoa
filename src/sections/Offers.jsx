import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllServices,
  setServicesList,
  startSettingServicesList,
  failedToSetServicesList,
} from '../redux/slices/serviceSlice';
import { selectAlltextsList } from '../redux/slices/textsSlice';
function Offers() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const { servicesList } = useSelector(selectAllServices);
  const { textsList } = useSelector(selectAlltextsList);
  const serviceData = async () => {
    dispatch(startSettingServicesList(true));
    try {
      const response = await fetch(`${baseUrl}/api/services/getAll`);
      const data = await response.json();

      if (data.status === 'success') {
        dispatch(setServicesList(data.data));
        dispatch(failedToSetServicesList(null));
        dispatch(startSettingServicesList(false));
      }
    } catch (error) {
      dispatch(failedToSetServicesList(null));
      dispatch(startSettingServicesList(true));
      console.log(error);
    }
  };
  useEffect(() => {
    serviceData();
  }, []);
  return (
    <div className=" flex flex-col justify-center relative items-center w-[100%] gap-12">
      <div className="relative flex flex-col justify-between items-center">
        <h1 className="title text-emerald-700">{textsList.serviceTitle}</h1>
        <p className="text-lg md:text-lg text-neutral-400  text-center md:max-w-[600px] mx-2">
          {textsList.serviceSubtitle}
        </p>
      </div>
      <div className="flex flex-col items-center  md:flex-row md:flex-wrap gap-4 md:gap-8">
        {servicesList.length > 0 &&
          servicesList.map((service) => (
            <div
              key={service.serviceId}
              className="flex flex-col items-start justify-between w-full max-w-[300px] md:max-w-[350px] bg-zinc-800 shadow-lg shadow-neutral-400 rounded-2xl  p-2 md:p-4 gap-8 hover:bg-emerald-800"
            >
              <div className="flex flex-col items-center justify-center w-full gap-8">
                <img
                  src={service.serviceImage}
                  alt="service icon"
                  className="rounded-full border-2 border-emerald-800 p-6 h-24 w-24"
                />

                <h2 className="text-white text-xl">{service.serviceName}</h2>
                <p className="line-clamp-4 text-justify text-lg text-neutral-400">
                  {service.description}
                </p>
              </div>
              <div className="bottom-0 justify-start mt-auto">
                <Link
                  to={`/home/${service.serviceId}`}
                  className="gap-1 md:gap-4 bg-yellow-600 text-neutral-700 px-2 md:px-6 md:py-1 text-center font-bold rounded-2xl  hover:bg-yellow-600/80"
                >
                  More details...
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Offers;
