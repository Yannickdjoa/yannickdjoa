import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './sections/About';
import Experience from './sections/Experience';
import Footer from './sections/Footer';
import MainView from './sections/MainView';
import Navbar from './components/Navbar';
import Projects from './sections/Projects';
import ScrollToTop from './components/ScrollToTop';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Header from './sections/Header';

function App() {
  return (
    <Router>
      <Header />
      <MainView />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
