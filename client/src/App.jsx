import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from './sections/Header';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminPanel/adminDashElements/AdminDashboard';
import StackBox from './pages/AdminPanel/adminComponents/StackBox';
import AdminStacks from './pages/AdminPanel/AdminStacks';
import StackToDelete from './pages/AdminPanel/adminComponents/StackToDelete';
import AdminExperiences from './pages/AdminPanel/AdminExperiences';
import ExperienceToDelete from './pages/AdminPanel/adminComponents/ExperienceToDelete';
import ExperienceBox from './pages/AdminPanel/adminComponents/ExperienceBox';
import AdminProjects from './pages/AdminPanel/AdminProjects';
import ProjectBox from './pages/AdminPanel/adminComponents/ProjectBox';
import ProjectToDelete from './pages/AdminPanel/adminComponents/ProjectToDelete';

function App(criteria) {
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
      </Routes>
      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
