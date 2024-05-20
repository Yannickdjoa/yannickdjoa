import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function StackToDelete() {
  const params = useParams();
  const navigate = useNavigate();
  const [stackData, setStackData] = useState({
    category: '',
    stackName: '',
    stackPercentage: '',
    stackImage: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const currentData = async () => {
    const response = await fetch(`/api/stacks/getSingleStack/${params.itemId}`);
    const data = await response.json();
    if (data.status == 'success') {
      setStackData({ ...data.data });
    }
  };
  useEffect(() => {
    currentData();
  }, []);

  const handleDelete = async (e) => {
    try {
      const response = await fetch(`/api/stacks/delete/${params.itemId}`, {
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
      {stackData && (
        <div className="flex flex-col justify-center items-center h-[80vh] w-full">
          <h1 className="text-2xl font-semibold text-red-500">
            Review {stackData.stackName} stack's details before deleting
          </h1>
          <div className="flex flex-col mt-8 gap-8 border-2 border-neutral-500 justify-center items-start p-16">
            <img src={stackData.stackImage} className="h-24 w24" />
            <p className="text-white text-xl">stackId: {stackData.stackId}</p>
            <p className="text-white text-xl">Category: {stackData.category}</p>
            <p className="text-white text-xl">
              Stack Name: {stackData.stackName}
            </p>
            <p className="text-white text-xl">
              Knowledge Percentage: {stackData.stackPercentage} %
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

export default StackToDelete;
