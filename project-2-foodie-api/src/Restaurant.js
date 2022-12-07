import React from "react"
import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const  Restaurant = () => {
    
    const [ restaurant, setRestaurant ] = useState(null);
    const { id } = useParams()
    
    const getRestaurantName = async () => {
        try{
            const response = await fetch(`../public/data.json/`);
            
            const restaurantData = await response.json();
            
            console.log(restaurantData)

            setRestaurant(restaurantData);
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {getRestaurantName();}, []);


    const loaded = () => {
        return (
          <div className="details-container">
              <div className="details">
                  <h2>{restaurant.name}</h2>

                  </div>
    </div>
  )


}
const loading = () => {return (<h1>Loading Page...</h1>);};
return restaurant ? loaded() : loading();
};

export default Restaurant;