import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';





 
function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Router>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Dashboard darkMode={darkMode} />} />
      
          <Route path="/docs" element={<Documentation darkMode={darkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}
 
export default App;