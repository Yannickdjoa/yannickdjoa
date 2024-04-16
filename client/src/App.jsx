import About from './components/About';
import Experience from './components/Experience';
import Footer from './components/Footer';
import MainView from './components/MainView';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/contact';

function App() {
  return (
    <div>
      <Navbar />
      <MainView />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
