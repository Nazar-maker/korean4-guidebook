import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Intro from './components/sections/Intro';
import Sick from './components/sections/Sick';
import Health from './components/sections/Health';
import Seasonal from './components/sections/Seasonal';
import Summary from './components/sections/Summary';
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash && ['intro', 'sick', 'health', 'seasonal', 'summary'].includes(hash) ? hash : 'intro';
  });

  useEffect(() => {
    window.location.hash = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ['intro', 'sick', 'health', 'seasonal', 'summary'].includes(hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const sections: Record<string, ReactNode> = {
    intro: <Intro onSectionChange={setActiveSection} />,
    sick: <Sick />,
    health: <Health />,
    seasonal: <Seasonal />,
    summary: <Summary />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-800">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 px-6 md:px-10 py-8 overflow-y-auto max-w-6xl mx-auto w-full">
        {sections[activeSection]}
      </main>

  <Footer />
    </div>
  );
}

export default App;
