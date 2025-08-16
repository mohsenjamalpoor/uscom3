import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';




import Header from './components/Header';

 
function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Router>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
       
       
      
      </Router>
    </div>
  );
}
 
export default App;