import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MessageForm from './MessageForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginBottom: 2,
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: '#404040',
  border: '2px solid #a3a3a3',
  boxShadow: 4,
  p: 2,
  display: 'grid',
  gap: 1,
  gridTemplateColumns: 'repeat(2)',
};
function ServiceCard() {
  const params = useParams();
  const [serviceData, setServiceData] = useState({});
  const [showAddModal, setAddModal] = useState(false);
  const getService = async () => {
    try {
      const response = await fetch(`/api/services/get/${params.serviceId}`);
      const data = await response.json();
      if (data.status === 'success') {
        setServiceData({ ...data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getService(params.serviceId);
  }, [params.serviceId]);
  console.log(serviceData.howItWorks);

  return (
    <div>
      <div className="flex flex-col items-center m-2">
        <div className="relative flex flex-col justify-between items-center  ">
          <h1 className="title text-emerald-700">Service Details</h1>
          <p className="text-lg md:text-lg text-neutral-400  text-center md:max-w-[600px] mx-2">
            We Are Here To Bring Your App project Live
          </p>
        </div>
        <div className="relative flex flex-col justify-between items-center border-2 p-4 mt-8">
          {serviceData && (
            <div className="flex flex-col  items-start justify-between gap-2 md:gap-16 p-8 m-8 w-full max-w-[1100px]">
              <div className="flex flex-row items-center gap-8">
                <h2 className="text-white text-xl md:2xl mb-4 font-semibold">
                  <span>{serviceData.serviceName}</span>
                </h2>
                <div className="flex justify-center">
                  <img
                    src={serviceData.serviceImage}
                    alt="service icon"
                    className="h-16 w-16 rounded-full md:animate-pulse"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-white text-lg font-semibold">
                    Delevery Time :{' '}
                  </span>
                  <span className="text-sm md:text-lg">
                    {serviceData.timeFrame}
                  </span>
                </p>
                <p>
                  <span className="text-white text-xl font-semibold">
                    Cost :{' '}
                  </span>
                  <span className="animate-pulse text-xl text-neutral-700 rounded-lg p-1 font-semibold bg-yellow-600">
                    {serviceData.price}
                  </span>
                </p>
                <ul className="items-center gap-1 md:gap-4 text-neutral-400 flex flex-row flex-wrap">
                  <span className="text-white text-xl font-semibold">
                    Stacks Used :{' '}
                  </span>{' '}
                  <br />
                  {serviceData.stacksUsed &&
                    serviceData.stacksUsed.length > 0 &&
                    serviceData.stacksUsed.map((stack, index) => (
                      <li
                        key={index}
                        className=" pr-2 border-r-2  border-neutral-400 text-sm md:text-lg"
                      >
                        {stack}
                      </li>
                    ))}
                </ul>
                <ul className="items-center gap-1 md:gap-4 text-neutral-400 flex flex-row flex-wrap">
                  <span className="text-white text-xl font-semibold">
                    Programming Language :{' '}
                  </span>{' '}
                  <br />
                  {serviceData.language &&
                    serviceData.language.length > 0 &&
                    serviceData.language.map((language, index) => (
                      <li
                        key={index}
                        className=" pr-2 border-r-2  border-neutral-400 text-sm md:text-lg"
                      >
                        {language}
                      </li>
                    ))}
                </ul>
                <p>
                  <span className="text-white text-xl font-semibold">
                    Service Overview :{' '}
                  </span>{' '}
                  <br />
                  <span className="text-sm md:text-lg">
                    {serviceData.description}
                  </span>
                </p>
                <ol className="list-decimal list-inside text-neutral-400">
                  <span className="text-white text-xl font-semibold">
                    How It Works :{' '}
                  </span>
                  <br />
                  {serviceData.howItWorks &&
                    serviceData.howItWorks.length > 0 &&
                    serviceData.howItWorks.map((detail, index) => (
                      <li key={index} className=" pr-2 text-sm md:text-lg">
                        {detail}
                      </li>
                    ))}
                </ol>
                <ol className="list-decimal list-inside text-neutral-400">
                  <span className="text-white text-xl font-semibold">
                    Key Features :{' '}
                  </span>
                  <br />
                  {serviceData.keyFeatures &&
                    serviceData.keyFeatures.length > 0 &&
                    serviceData.keyFeatures.map((feature, index) => (
                      <li key={index} className=" pr-2 text-sm md:text-lg">
                        {feature}
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          )}
          <div className="bottom-0 justify-start mt-auto">
            <button
              type="button"
              onClick={(e) => setAddModal(true)}
              className="gap-1 md:gap-4 bg-yellow-600 text-neutral-700 px-2 md:px-6 md:py-1 text-center font-bold rounded-2xl  hover:bg-yellow-600/80"
            >
              Get Started Today!
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={showAddModal}
        onClose={() => setAddModal(false)}
        aria-labelledby="add-service"
      >
        <Box sx={style}>
          <div className="flex flex-row gap-4 justify-end ">
            <button
              onClick={(e) => setAddModal(false)}
              className=" text-white  text-xl font-bold border-2 p-2 rounded-full"
              type="button"
            >
              X
            </button>
          </div>
          <MessageForm />
        </Box>
      </Modal>
    </div>
  );
}

export default ServiceCard;
