import "./Home.css";
import React from "react"
import { useState, useEffect } from "react";
// import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import Carousel from "./carousel.js";
const proxyURL = 'https://thoffman-corsproxy.herokuapp.com/';
const LA_URL = 'https://api.yelp.com/v3/businesses/search?location=los%20angeles%2C%20ca&term=restaurants&sort_by=best_match&limit=20';
const apiKey = 'zU4QuOhJoqNzQwtn3GOKS2hHhX2zfsEy_JQvQg4O0mI5fyPFLCr4Q3NYUwAmdm06Jtw7QPG-MxBgS7CP-gVqzcdmGid3bjR9clpCI_9xArhMljNrpd6xVjJV2XyOY3Yx';


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
                console.log('home fetch', response)
            setRestaurant(data)
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {getRestaurants();}, []);

    if (restaurant) {
        return (
            <div className="home-card-wrapper">
                {/* <Carousel/> */}
            {
                restaurant.businesses.map((name) => {
                return (
                    <Link to={`/restaurant/${ name.id }`} key={ name.id }>
                        <div className="card">
                            <div className="card-title">
                                <h3>{name.name}</h3>
                            </div>
                        </div>
                    </Link>
                )
                })
            }
            </div>
        )         
   } else { return <h1>Loading ...</h1> }
}

export default Home;
