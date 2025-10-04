import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CMSProvider } from './contexts/CMSContext';
import Layout from './components/Layout';
import EditModeToggle from './components/EditModeToggle';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  return (
    <CMSProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
        <EditModeToggle />
      </Router>
    </CMSProvider>
  );
}

export default App;
