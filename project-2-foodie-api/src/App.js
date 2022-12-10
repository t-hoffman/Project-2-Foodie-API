import './App.css';
import Home from './Home';
import Restaurant from './Restaurant';
import NavBar from './NavBar';
import SearchPage from './SearchPage_Yelp';
import Test from './test_yelp';
import Carousel from './testcarousel';
import Component from './Component';
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
        <Route path="/test/:id/:name/:city" element={<Test />} />
        <Route path="/test/:id/:name/:city/:state" element={<Test />} />
        <Route path="/test/:id/:name/:city/:state/:lat" element={<Test />} />
        <Route path="/test/:id/:name/:city/:state/:lat/:long" element={<Test />} />
        <Route path="/car" element={<Carousel />} />
        <Route path="/component" element={<Component />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
