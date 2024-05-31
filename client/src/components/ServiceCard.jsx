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
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-16 p-8 m-8 w-full max-w-[900px]">
              <div className="flex h-full w-full md:w-[30%] justify-center">
                <img
                  src={serviceData.serviceImage}
                  alt="service icon"
                  className="h-32 md:h-48 md:w-48 rounded-full md:animate-pulse"
                />
              </div>
              <div className="flex flex-col gap-2 w-[70%]">
                <h2 className="text-white text-xl mb-4 font-semibold">
                  <span>{serviceData.category} : </span>
                  <span>{serviceData.serviceName}</span>
                </h2>
                <p>
                  <span className=" font-bold">Expected Delevery Time : </span>
                  <span>{serviceData.timeFrame}</span>
                </p>
                <p>
                  <span className=" font-bold">Cost : </span>
                  <span>{serviceData.price}</span>
                </p>
                <p></p>
                <p>
                  <span className=" font-bold">Stacks Used : </span>{' '}
                  <span>{serviceData.stacksUsed}</span>
                </p>
                <p>{serviceData.description}</p>
              </div>
            </div>
          )}
          <div className="bottom-0 justify-start mt-auto">
            <button
              type="button"
              onClick={(e) => setAddModal(true)}
              className="gap-1 md:gap-4 bg-yellow-600 text-neutral-700 px-2 md:px-6 md:py-1 text-center font-bold rounded-2xl  hover:bg-yellow-600/80"
            >
              Book it now
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
