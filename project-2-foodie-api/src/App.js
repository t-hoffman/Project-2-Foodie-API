import './App.css';
import Home from './Home';

import NavBar from './NavBar';
import SearchPage from './SearchPage_Yelp';
import RestaurantPage from './RestaurantPage';
import TestCarousel from './testcarousel';
import Component from './Component';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
  <div className="body">
    <div className="foodie-container">
      <NavBar />
      <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/search/:city" element={<SearchPage />} />
        <Route path="/restaurantpage/:id" element={<RestaurantPage />} />
        <Route path="/restaurantpage/:id/:name" element={<RestaurantPage />} />
        <Route path="/restaurantpage/:id/:name/:city" element={<RestaurantPage />} />
        <Route path="/restaurantpage/:id/:name/:city/:state" element={<RestaurantPage />} />
        <Route path="/restaurantpage/:id/:name/:city/:state/:lat" element={<RestaurantPage />} />
        <Route path="/restaurantpage/:id/:name/:city/:state/:lat/:long" element={<RestaurantPage />} />
        <Route path="/car" element={<TestCarousel />} />
        <Route path="/component" element={<Component />} />
      </Routes>
      </div>
    </div>
  </div>
  );
}

export default App;
