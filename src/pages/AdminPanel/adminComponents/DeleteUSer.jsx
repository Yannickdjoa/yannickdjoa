import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';

function DeleteUSer() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    uid: '',
    name: '',
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: '',
    location: '',
    github: '',
    contractType: '',
    category: '',
    avatar: '',
    position: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const userToDeleteData = async () => {
    const response = await fetch(`${baseUrl}/api/users/get/${params.userId}`);
    const data = await response.json();
    if (data.status == 'success') {
      setUserData({ ...data.data });
    }
  };
  useEffect(() => {
    userToDeleteData();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/users/delete/${params.userId}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      if (data.status === 'success') {
        navigate('/admindashboard/usermanagement');
      } else {
        return setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userData && (
        <div className="flex flex-col justify-center items-center h-[80vh] w-full">
          <h1 className="text-2xl font-semibold text-red-500">
            Review {userData.userName} users details before deleting
          </h1>
          <div className="flex flex-col mt-8 gap-8 border-2 border-neutral-500 justify-center items-start p-16">
            <img src={userData.serviceImage} className="h-24 w24" />
            <p className="text-white text-xl">user: {userData.userName}</p>
            <p className="text-white text-xl">Category: {userData.category}</p>
            <p className="text-white text-xl">uid Number: {userData.uid}</p>
            <p className="text-white text-xl">Name: {userData.name}</p>
            <p className="text-white text-xl">Email: {userData.email}</p>
            <p className="text-white text-xl">
              Phone Number: {userData.stacksUsed}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-center items-center gap-8 ">
        <button
          className="btn bg-red-700 text-white font-normal"
          onClick={handleDelete}
        >
          Confirm Deletion
        </button>

        <button
          disabled={loading}
          type="button"
          className="flex  cursor-pointer active items-center gap-2 text-center bg-neutral-600 p-2 rounded-xl text-xl font-semibold text-yellow-600 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
          onClick={() => navigate('/admindashboard/usermanagement')}
        >
          <TiArrowBackOutline className=" md:h-6 md:w-6" />
          Cancel
        </button>
      </div>
      {error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  );
}

export default DeleteUSer;
