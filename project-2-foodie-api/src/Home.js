import "./Home.css";

import React from "react"

import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';

import Carousel from "react-bootstrap/Carousel"

const proxyURL = 'https://thoffman-corsproxy.herokuapp.com/';

const LA_URL = 'https://api.yelp.com/v3/businesses/search?location=los%20angeles&attributes=hot_and_new&sort_by=best_match&limit=20';

const apiKey = process.env.REACT_APP_YELP_API_KEY;


const options = {
    method: 'GET',
    headers: {
        'Target-URL': LA_URL, // Yelp API URL
        'Authorization': 'Bearer ' + apiKey,
    }
  };
  


const Home = () => {
    
    const [ restaurant, setRestaurant ] = useState(null)
    
   
    const getRestaurants = async () => {
        try{
            const response = await fetch(proxyURL, options);
            const data = await response.json();
            setRestaurant(data)
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {getRestaurants();}, []);

    if (restaurant) {
        return (
            <div className="home-card-wrapper">

                <h1 id="hot-new-label"> Hot and New! </h1>
                <h3 id="hot-new"> These are some of the hottest and newest restaurants we recommend in Los Angeles </h3>
                
                <Carousel interval={null}>

            {

               
                restaurant.businesses.map((rest) => {
                return (
                   
                          
                           
                         
                            <Carousel.Item>
                            <img src={rest.image_url} width="100%" />
                      
                              <Carousel.Caption>
                                <h3 id= "rest-link"><Link to={`/restaurantpage/${rest.id}/${rest.name}/${rest.location.city}/${rest.location.state}/${rest.coordinates.latitude}/${rest.coordinates.longitude}`}> {rest.name} </Link></h3>
                                
                              </Carousel.Caption>
                            </Carousel.Item>
                          
                        );
                      }
                )
                }
            
            </Carousel>

            </div>
    
        )         
   } else { return <h1>Loading ...</h1> }
}

export default Home;
