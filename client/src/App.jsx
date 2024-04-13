import About from './components/About';
import Experience from './components/Experience';
import MainView from './components/MainView';
import Navbar from './components/Navbar';
import Skills from './components/Skills';

function App() {
  return (
    <div>
      <Navbar />
      <MainView />
      <About />
      <Skills />
      <Experience />
    </div>
  );
}

export default App;
