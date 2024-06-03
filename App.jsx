import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Header from './client/src/sections/Header';
import Footer from './client/src/sections/Footer';
import ScrollToTop from './client/src/components/ScrollToTop';
import Home from './client/src/pages/customerInterfaces/Home';
import About from './client/src/pages/customerInterfaces/About';
import Portfolio from './client/src/pages/customerInterfaces/Portfolio';
import Contact from './client/src/pages/customerInterfaces/Contact';
import AdminDashboard from './client/src/pages/AdminPanel/AdminDashboard';
import AdminStacks from './client/src/pages/AdminPanel/adminDashElements/AdminStacks';
import StackBox from './client/src/pages/AdminPanel/adminComponents/StackBox';
import StackToDelete from './client/src/pages/AdminPanel/adminComponents/StackToDelete';
import AdminExperiences from './client/src/pages/AdminPanel/adminDashElements/AdminExperiences';
import ExperienceToDelete from './client/src/pages/AdminPanel/adminComponents/ExperienceToDelete';
import ExperienceBox from './client/src/pages/AdminPanel/adminComponents/ExperienceBox';
import AdminProjects from './client/src/pages/AdminPanel/adminDashElements/AdminProjects';
import ProjectBox from './client/src/pages/AdminPanel/adminComponents/ProjectBox';
import AdminServices from './client/src/pages/AdminPanel/adminDashElements/AdminServices';
import ServiceBox from './client/src/pages/AdminPanel/adminComponents/ServiceBox';
import ServiceToDelete from './client/src/pages/AdminPanel/adminComponents/ServiceToDelete';
import ProjectToDelete from './client/src/pages/AdminPanel/adminComponents/ProjectToDelete';
import { useDispatch, useSelector } from 'react-redux';
import {
  startGettingTextsList,
  errorGettingTextsList,
  setTextsList,
  selectAlltextsList,
} from './client/src/redux/slices/textsSlice';
import {
  startGettingBioDataList,
  errorGettingBioDataList,
  setBioDataList,
  selectAllBioDataList,
} from './client/src/redux/slices/bioSlice';
import { useEffect } from 'react';
import ServiceCard from './client/src/components/ServiceCard';

function App(criteria) {
  const dispatch = useDispatch();
  const { textsList } = useSelector(selectAlltextsList);
  const { bioDataList } = useSelector(selectAllBioDataList);

  const getTextCollection = async () => {
    dispatch(startGettingTextsList(true));
    try {
      const response = await fetch('/api/textCollection/get/1715156244365');
      const data = await response.json();
      if (data.status === 'success') {
        dispatch(setTextsList(data.data));
        dispatch(errorGettingTextsList(false));
        dispatch(startGettingTextsList(false));
      }
    } catch (error) {
      dispatch(errorGettingTextsList(true));
      dispatch(startGettingTextsList(false));
    }
  };

  const getBioData = async () => {
    dispatch(startGettingBioDataList(true));
    try {
      const response = await fetch('/api/bio/get/1715803389046');
      const data = await response.json();
      if (data.status === 'success') {
        dispatch(setBioDataList(data.data));
        dispatch(errorGettingBioDataList(false));
        dispatch(startGettingBioDataList(false));
      }
    } catch (error) {
      dispatch(errorGettingBioDataList(true));
      dispatch(startGettingBioDataList(false));
    }
  };
  useEffect(() => {
    getBioData();
    getTextCollection();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:serviceId" element={<ServiceCard />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            {/* admin routes */}
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route
              path="/admindashboard/adminstacks"
              element={<AdminStacks />}
            />
            <Route
              path="/admindashboard/adminstacks/:itemId"
              element={<StackBox />}
            />
            <Route
              path="/admindashboard/adminstacks/confirmdelation/:itemId"
              element={<StackToDelete />}
            />
            <Route
              path="/admindashboard/experiences"
              element={<AdminExperiences />}
            />
            <Route
              path="/admindashboard/experiences/:experId"
              element={<ExperienceBox />}
            />
            <Route
              path="/admindashboard/experiences/confirmdelation/:experId"
              element={<ExperienceToDelete />}
            />
            <Route
              path="/admindashboard/projects"
              element={<AdminProjects />}
            />
            <Route
              path="/admindashboard/projects/:projId"
              element={<ProjectBox />}
            />
            <Route
              path="/admindashboard/projects/confirmdelation/:projId"
              element={<ProjectToDelete />}
            />
            <Route
              path="/admindashboard/services"
              element={<AdminServices />}
            />
            <Route
              path="/admindashboard/services/:servId"
              element={<ServiceBox />}
            />
            <Route
              path="/admindashboard/services/confirmdelation/:servId"
              element={<ServiceToDelete />}
            />
          </Routes>
        </div>
        <ScrollToTop />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
