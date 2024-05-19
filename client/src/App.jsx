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
import StacksBox from './pages/AdminPanel/adminComponents/StacksBox';

function App(criteria) {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />

        {/* admin routes */}
        <Route path="admindashboard" element={<AdminDashboard />}>
          <Route path="admindashboard/:itemId" element={<StacksBox />} />
        </Route>
      </Routes>
      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
