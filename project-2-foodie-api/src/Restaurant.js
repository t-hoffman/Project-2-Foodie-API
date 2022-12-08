// import React, { createRef } from "react"
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const  Restaurant = () => {
    
    const [ restaurant, setRestaurant ] = useState(null);
    const { id } = useParams()
    

    const getRestaurantName = async () => {
        try{
            const response = await fetch('/data.json');
            console.log("response", response)
            
            const restaurantData = await response.json();
            console.log('rest', restaurantData) 
            

            setRestaurant(restaurantData);

        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        
        getRestaurantName();
        console.log('r', restaurant)
    }, []);


    

    if (restaurant) {
        // const { name, review_count, categories } = restaurant.businesses[id]
        return (
            <>
            { 
            <>
            <div className="rest-card-wrapper">
            <img src=
            {Object.values(restaurant.businesses).filter(e => e.id === id)[0].image_url}/>
            <div>
            {Object.values(restaurant.businesses).filter(e => e.id === id)[0].name}
            </div>
            <div>
            {Object.values(restaurant.businesses).filter(e => e.id === id)[0].price}
            </div>
            <div>
            {Object.values(restaurant.businesses).filter(e => e.id === id)[0].rating}
            </div>
            <div>
            {Object.values(restaurant.businesses).filter(e => e.id === id)[0].review_count}
            </div>
            </div>
            </>
            }
            
                {/* <section className= "container">
                    <div className= "restaurant-info">
                        <div className = "name-div"> {name} </div>
                        <div className = "review-number"> {review_count} </div>
                        <div className = "categories">{categories} </div>
                    </div>

                </section> */}
            </>
        )
    } else {         
        return (
        <>
            <h1> Loading ...</h1>
        </>
        )}
};

export default Restaurant;