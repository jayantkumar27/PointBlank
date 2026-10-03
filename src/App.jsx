import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SpeechLab from './pages/SpeechLab';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/coach" element={<SpeechLab />} />
      </Routes>
    </Router>
  );
}

export default App;
