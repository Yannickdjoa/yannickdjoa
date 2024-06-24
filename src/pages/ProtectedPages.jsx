import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';
import { Route, Routes } from 'react-router-dom';
import ProjectBox from './AdminPanel/adminComponents/ProjectBox';
import ProjectToDelete from './AdminPanel/adminComponents/ProjectToDelete';
import AdminServices from './AdminPanel/adminDashElements/AdminServices';
import ServiceBox from './AdminPanel/adminComponents/ServiceBox';
import ServiceToDelete from './AdminPanel/adminComponents/ServiceToDelete';
import UserManagement from './AdminPanel/UserManagement';
import UpdateUser from './AdminPanel/adminComponents/UpdateUser';
import DeleteUSer from './AdminPanel/adminComponents/DeleteUSer';
import AdminDashboard from './AdminPanel/AdminDashboard';
import AdminStacks from './AdminPanel/adminDashElements/AdminStacks';
import StackBox from './AdminPanel/adminComponents/StackBox';
import StackToDelete from './AdminPanel/adminComponents/StackToDelete';
import AdminExperiences from './AdminPanel/adminDashElements/AdminExperiences';
import ExperienceBox from './AdminPanel/adminComponents/ExperienceBox';
import ExperienceToDelete from './AdminPanel/adminComponents/ExperienceToDelete';
import AdminProjects from './AdminPanel/adminDashElements/AdminProjects';

function ProtectedPages() {
  const { isAuthenticated } = useSelector(loginUser);

  return (
    <div>{isAuthenticated ? <Outlet /> : <Navigate to={'/adminLogin'} />}</div>
  );
}

export default ProtectedPages;

{
  /* <Routes>
  <Route path="/admindashboard" element={<AdminDashboard />} />
  <Route path="/admindashboard/adminstacks" element={<AdminStacks />} />
  <Route path="/admindashboard/adminstacks/:itemId" element={<StackBox />} />
  <Route
    path="/admindashboard/adminstacks/confirmdelation/:itemId"
    element={<StackToDelete />}
  />
  <Route path="/admindashboard/experiences" element={<AdminExperiences />} />
  <Route
    path="/admindashboard/experiences/:experId"
    element={<ExperienceBox />}
  />
  <Route
    path="/admindashboard/experiences/confirmdelation/:experId"
    element={<ExperienceToDelete />}
  />
  <Route path="/admindashboard/projects" element={<AdminProjects />} />
  <Route path="/admindashboard/projects/:projId" element={<ProjectBox />} />
  <Route
    path="/admindashboard/projects/confirmdelation/:projId"
    element={<ProjectToDelete />}
  />
  <Route path="/admindashboard/services" element={<AdminServices />} />
  <Route path="/admindashboard/services/:servId" element={<ServiceBox />} />
  <Route
    path="/admindashboard/services/confirmdelation/:servId"
    element={<ServiceToDelete />}
  />
  <Route path="/admindashboard/usermanagement" element={<UserManagement />} />
  <Route
    path="/admindashboard/usermanagement/updateuser/:userId"
    element={<UpdateUser />}
  />
  <Route
    path="/admindashboard/usermanagement/deleteteuser/:userId"
    element={<DeleteUSer />}
  />
</Routes>; */
}
