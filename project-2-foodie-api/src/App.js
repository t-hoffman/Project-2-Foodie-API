import './App.css';
import Home from './Home';
import Restaurant from './Restaurant';
import NavBar from './NavBar';
import SearchPage from './SearchPage_Yelp';
import Test from './test_yelp';
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
        <Route path="/test/:id" element={<Test />} />
        <Route path="/test/:id/:name" element={<Test />} />
        <Route path="/test/:id/:name/:lat" element={<Test />} />
        <Route path="/test/:id/:name/:lat/:long" element={<Test />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
