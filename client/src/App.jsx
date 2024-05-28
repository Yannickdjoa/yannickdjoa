import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './sections/Header';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/customerInterfaces/Home';
import About from './pages/customerInterfaces/About';
import Portfolio from './pages/customerInterfaces/Portfolio';
import Contact from './pages/customerInterfaces/Contact';
import AdminDashboard from './pages/AdminPanel/AdminDashboard';
import StackBox from './pages/AdminPanel/adminComponents/StackBox';
import AdminStacks from './pages/AdminPanel/adminDashElements/AdminStacks';
import StackToDelete from './pages/AdminPanel/adminComponents/StackToDelete';
import AdminExperiences from './pages/AdminPanel/adminDashElements/AdminExperiences';
import ExperienceToDelete from './pages/AdminPanel/adminComponents/ExperienceToDelete';
import ExperienceBox from './pages/AdminPanel/adminComponents/ExperienceBox';
import AdminProjects from './pages/AdminPanel/adminDashElements/AdminProjects';
import ProjectBox from './pages/AdminPanel/adminComponents/ProjectBox';
import AdminServices from './pages/AdminPanel/adminDashElements/AdminServices';
import ServiceBox from './pages/AdminPanel/adminComponents/ServiceBox';
import ServiceToDelete from './pages/AdminPanel/adminComponents/ServiceToDelete';
import ProjectToDelete from './pages/AdminPanel/adminComponents/ProjectToDelete';
import { useDispatch, useSelector } from 'react-redux';
import {
  startGettingTextCollectionList,
  errorGettingTextCollectionList,
  setTextCollectionList,
  selectAllTextCollectionList,
} from './redux/slices/textsSlice';
import {
  startGettingBioDataList,
  errorGettingBioDataList,
  setBioDataList,
  selectAllBioDataList,
} from './redux/slices/bioSlice';
import { useEffect } from 'react';

function App(criteria) {
  const dispatch = useDispatch();
  const { textCollectionList } = useSelector(selectAllTextCollectionList);
  console.log(textCollectionList);
  const getTextCollection = async () => {
    dispatch(startGettingTextCollectionList(true));
    try {
      const response = await fetch('/api/textCollection/get/1715156244365');
      const data = await response.json();
      if (data.status === 'success') {
        dispatch(setTextCollectionList(data.data));
        dispatch(errorGettingTextCollectionList(false));
        dispatch(startGettingTextCollectionList(false));
      }
    } catch (error) {
      dispatch(errorGettingTextCollectionList(true));
      dispatch(startGettingTextCollectionList(false));
    }
  };
  useEffect(() => {
    getTextCollection();
    console.log(textCollectionList);
  }, []);
  const { bioDataList } = useSelector(selectAllBioDataList);
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
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        {/* admin routes */}
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admindashboard/adminstacks" element={<AdminStacks />} />
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
        <Route path="/admindashboard/projects" element={<AdminProjects />} />
        <Route
          path="/admindashboard/projects/:projId"
          element={<ProjectBox />}
        />
        <Route
          path="/admindashboard/projects/confirmdelation/:projId"
          element={<ProjectToDelete />}
        />
        <Route path="/admindashboard/services" element={<AdminServices />} />
        <Route
          path="/admindashboard/services/:servId"
          element={<ServiceBox />}
        />
        <Route
          path="/admindashboard/services/confirmdelation/:servId"
          element={<ServiceToDelete />}
        />
      </Routes>
      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
