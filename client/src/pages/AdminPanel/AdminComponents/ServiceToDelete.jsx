import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ServiceToDelete() {
  const params = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    category: '',
    serviceName: '',
    description: '',
    price: '',
    timeFrame: '',
    serviceImage: '',
    stacksUsed: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const currentData = async () => {
    const response = await fetch(`/api/services/get/${params.servId}`);
    const data = await response.json();
    if (data.status == 'success') {
      setServiceData({ ...data.data });
    }
  };
  useEffect(() => {
    currentData();
  }, []);

  const handleDelete = async (e) => {
    try {
      const response = await fetch(`/api/services/delete/${params.servId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status === 'success') {
        return data.message;
      } else {
        return setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    navigate('/admindashboard');
  };

  return (
    <div>
      {serviceData && (
        <div className="flex flex-col justify-center items-center h-[80vh] w-full">
          <h1 className="text-2xl font-semibold text-red-500">
            Review {serviceData.serviceName} service's details before deleting
          </h1>
          <div className="flex flex-col mt-8 gap-8 border-2 border-neutral-500 justify-center items-start p-16">
            <img src={serviceData.serviceImage} className="h-24 w24" />
            <p className="text-white text-xl">
              Service: {serviceData.serviceName}
            </p>
            <p className="text-white text-xl">
              Category: {serviceData.category}
            </p>
            <p className="text-white text-xl">
              Time Needed: {serviceData.timeFrame}
            </p>
            <p className="text-white text-xl">Price: {serviceData.price}</p>
            <p className="text-white text-xl">
              Description: {serviceData.description}
            </p>
            <p className="text-white text-xl">
              Stacks used: {serviceData.stacksUsed}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-row justify-center gap-16 ">
        <button
          className="btn bg-red-700 text-white font-normal"
          onClick={handleDelete}
        >
          Confirm Deletion
        </button>

        {/* <button
            disabled={loading || uploading}
            type="button"
            className="flex  cursor-pointer active items-center gap-2 text-center bg-neutral-600 mt-1 p-3 rounded-xl text-xl font-semibold text-yellow-600 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
            onClick={() => navigate('/admindashboard')}
          >
            <TiArrowBackOutline className=" md:h-8 md:w-8" />
            Back
          </button> */}
      </div>
      {error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  );
}

export default ServiceToDelete;
