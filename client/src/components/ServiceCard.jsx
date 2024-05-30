import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ServiceCard() {
  const params = useParams();
  const [serviceData, setServiceData] = useState({});
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
    <div className="flex flex-col justify-between items-center m-18">
      <div className="title text-emerald-700">Service Details</div>
      {serviceData && (
        <div className="flex flex-col items-start gap-2 md:gap-4 p-8 m-8 w-full max-w-[700px]">
          <img
            src={serviceData.serviceImage}
            alt="service icon"
            className="h32 w-32"
          />
          <h2>{serviceData.serviceName}</h2>
          <p>{serviceData.timeFrame}</p>
          <p>Cost: {serviceData.price}</p>
          <p>{serviceData.category}</p>
          <p>Tacks Used: {serviceData.stacksUsed}</p>
          <p>{serviceData.description}</p>
        </div>
      )}
      <div className="bottom-0 justify-start mt-auto">
        <button className="gap-1 md:gap-4 bg-yellow-600 text-neutral-700 px-2 md:px-6 md:py-1 text-center font-bold rounded-2xl  hover:bg-yellow-600/80">
          Book it now
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
