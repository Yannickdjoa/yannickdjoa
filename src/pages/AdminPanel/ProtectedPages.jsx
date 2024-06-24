import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';

function ProtectedPages() {
  const { isAuthenticated } = useSelector(loginUser);

  return (
    <div>{isAuthenticated ? <Outlet /> : <Navigate to={'/adminLogin'} />}</div>
  );
}

export default ProtectedPages;
