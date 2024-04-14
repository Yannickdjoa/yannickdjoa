import About from './components/About';
import Experience from './components/Experience';
import MainView from './components/MainView';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

function App() {
  return (
    <div>
      <Navbar />
      <MainView />
      <About />
      <Skills />
      <Experience />
      <Projects />
    </div>
  );
}

export default App;
