// import React, { createRef } from "react"
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./Restaurant.css"


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
        // console.log('r', restaurant)
    }, []);


    

    if (restaurant) {
        // const { name, review_count, categories } = restaurant.businesses[id]
        return (
            <>
             {/* object.value is keying into restaurant.business object and turning it into an array. with that array we have many businesses and what .filter is doing is it 
                is filtering through the array, where the e.id is the business id of the business object. it is finding the url parameter id and returning the business that is = to the set id
                when it return it is still returning a array of an ojbect so [0] is keying into that object and displaying whatever object key value.*/}
            { 
            <>
            <div className="rest-card-wrapper">
            <img id="business-img" src=
            {Object.values(restaurant.businesses).filter(e => e.id === id)[0].image_url}/>
            
            <div className="business-elements">
                
               
            <div className="business-title">
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
                
            <div>
                {Object.values(restaurant.businesses).filter(e => e.id === id)[0].categories[{}]}
            </div>
            
            <div>
                {Object.values(restaurant.businesses).filter(e => e.id === id)[0].transactions}
            </div>

            <div>
                {Object.values(restaurant.businesses).filter(e => e.id === id)[0].price}
            </div>

            <div>
                {Object.values(restaurant.businesses).filter(e => e.id === id)[0].location.address1}
            </div>

            <div>
                {Object.values(restaurant.businesses).filter(e => e.id === id)[0].phone}
            </div>

            </div>
            </div>
            
            </>
            }

            
                
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