import React, { useEffect, useState } from 'react';
import { app, storage } from '../../../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function AdminTextCollection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    copyright: '',
    footerSocialTitle: '',
    skillsTitle: '',
    skillsSubtitle: '',
    aboutTitle: '',
    aboutSubtitle: '',
    experienceTitle: '',
    experienceSubtitle: '',
    portfolioTitle: '',
    portfolioSubtitle: '',
    newprojectTitle: '',
    newprojectButton: '',
    callToActionText: '',
    contactTitle: '',
    contactSubtitle: '',
    dashboardTitle: '',
    dashboardText1: '',
    dashboardText2: '',
    serviceTitle: '',
    serviceSubtitle: '',
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const currentData = async () => {
      const response = await fetch('/api/textCollection/get/1715156244365');
      const data = await response.json();

      if (data.status == 'success') {
        setFormData({ ...data.data });
      }
    };
    currentData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      setLoading(true);
      const response = await fetch('/api/textCollection/update/1715156244365', {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setLoading(false);
      if (data.status === 'success') {
        navigate('/admin');
      } else {
        return setError(data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <h1 className="text-center text-emerald-700 text-2xl font-bold">
          Update Any Text Collection's Element here
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Copyright
          </label>
          <input
            id="copyright"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.copyright}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Footer Social Title
          </label>
          <input
            id="footerSocialTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.footerSocialTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Skills Title
          </label>
          <input
            id="skillsTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.skillsTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Skills Subtitle
          </label>
          <input
            id="skillsSubtitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.skillsSubtitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            About Title
          </label>
          <input
            id="aboutTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.aboutTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            About Subtitle
          </label>
          <input
            id="aboutSubtitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.aboutSubtitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Experience Title
          </label>
          <input
            id="experienceTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.experienceTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Experience Subtitle
          </label>
          <input
            id="experienceSubtitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.experienceSubtitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Portfolio Title
          </label>
          <input
            id="portfolioTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.portfolioTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Portfolio Subtitle
          </label>
          <input
            id="portfolioSubtitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.portfolioSubtitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            New Project Title
          </label>
          <input
            id="newprojectTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.newprojectTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            New Project Button
          </label>
          <input
            id="newprojectButton"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.newprojectButton}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Call To Action Text
          </label>
          <input
            id="callToActionText"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.callToActionText}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Contact Title
          </label>
          <input
            id="contactTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.contactTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Contact Subtitle
          </label>
          <input
            id="contactSubtitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.contactSubtitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            DashboardTitle
          </label>
          <input
            id="dashboardTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.dashboardTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            DashboardText1
          </label>
          <input
            id="dashboardText1"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.dashboardText1}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            DashboardText2
          </label>
          <input
            id="dashboardText2"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.dashboardText2}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Service Title
          </label>
          <input
            id="serviceTitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.serviceTitle}
          />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="name" className="flex justify-start text-white">
            Service Subtitle
          </label>
          <input
            id="serviceSubtitle"
            type="text"
            className="input"
            onChange={handleChange}
            defaultValue={formData.serviceSubtitle}
          />
        </div>
        <button
          disabled={loading || uploading}
          type="submit"
          className="flex justify-end cursor-pointer active text-center bg-yellow-600 mt-1 p-3 rounded-xl text-xl font-semibold text-neutral-700 disabled:opacity-70 disabled:bg-yellow-600/50 disabled:cursor-wait"
        >
          {loading ? 'updating Bio...' : 'Save'}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default AdminTextCollection;
