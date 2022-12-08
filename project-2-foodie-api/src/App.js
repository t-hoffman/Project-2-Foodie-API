import './App.css';
import Home from './Home';
import Restaurant from './Restaurant';
import NavBar from './NavBar';
import SearchPage from './SearchPage';
import Test from './test';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <NavBar />
      <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/search/:city" element={<SearchPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
