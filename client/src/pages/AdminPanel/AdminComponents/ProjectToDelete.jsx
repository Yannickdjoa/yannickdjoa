import React, { useEffect, useState } from 'react';
import { TiArrowBackOutline } from 'react-icons/ti';
import { useNavigate, useParams } from 'react-router-dom';

function ProjectToDelete() {
  const params = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: '',
    period: '',
    description: '',
    projectImg: '',
    tags: [],
    category: '',
    github: '',
    appLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const currentData = async () => {
    const response = await fetch(`/api/projects/get/${params.projId}`);
    const data = await response.json();
    if (data.status == 'success') {
      setProjectData({ ...data.data });
    }
  };
  useEffect(() => {
    currentData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/projects/delete/${params.projId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status === 'success') {
        navigate('/admindashboard');
      } else {
        return setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {projectData && (
        <div className="flex flex-col justify-center items-center h-[100vh] w-[1000px] mt-8">
          <h1 className="text-2xl font-semibold text-red-500">
            Review {projectData.title} project's details before deleting
          </h1>
          <div className="flex flex-col mt-8 gap-8 border-2 border-neutral-500 justify-center items-start p-16">
            <img src={projectData.projectImg} className="h-24 w24" />
            <p className="text-white text-xl">Title: {projectData.title}</p>
            <p className="text-white text-xl">
              Category: {projectData.category}
            </p>
            <p className="text-white text-xl">Period: {projectData.period}</p>
            <p className="text-white text-xl flex flex-wrap">
              Description: {projectData.description}
            </p>
            <p className="text-white text-xl">
              Stacks used: {projectData.tags}
            </p>
            <p className="text-white text-xl">
              Github link: {projectData.github}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-row  gap-24 mt-10 ">
        <button
          className="btn bg-red-700 text-white font-normal justify-end"
          onClick={handleDelete}
        >
          Confirm Deletion
        </button>

        <button
          disabled={loading}
          type="button"
          className="flex  cursor-pointer active items-center gap-2 text-center bg-neutral-600 p-2 rounded-xl text-xl font-semibold text-yellow-600 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
          onClick={() => navigate('/admindashboard')}
        >
          <TiArrowBackOutline className=" md:h-6 md:w-6" />
          Cancel
        </button>
      </div>
      {error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  );
}

export default ProjectToDelete;
