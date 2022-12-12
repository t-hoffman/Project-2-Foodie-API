import './App.css';
import Home from './Home';
import NavBar from './NavBar';
import SearchPage from './SearchPage';
import RestaurantPage from './RestaurantPage';
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
      </Routes>
      </div>
    </div>
  </div>
  );
}

export default App;
