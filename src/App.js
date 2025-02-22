import './App.css';
import QrCodeGenerator from './components/QrCodeGenerator/QrCodeGenerator';
import QrScanner from './components/QrScanner';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="./components/QrScanner.js" element={<QrScanner />} />
          <Route path="./components/QrCodeGenerator/QrCodeGenerator.jsx" element={<QrCodeGenerator />} />
        </Routes>
    </Router>
  );
}

export default App;
