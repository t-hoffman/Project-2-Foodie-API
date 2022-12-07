import './App.css';
import Home from './Home';
import Restaurant from './Restaurant';
import NavBar from './NavBar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <NavBar />
      <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
