import "./Home.css";
import React from "react"
import { useState, useEffect } from "react";
// import { useParams } from "react-router";
import { Link } from 'react-router-dom';




const Home = () => {
    
    const [ restaurant, setRestaurant ] = useState(null)
    
    const getRestaurants = async () => {
        try{
            const response = await fetch('./data.json');
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
            <section className='container'>
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
            </section>
        )         
   } else { return <h1>Loading ...</h1> }
}

export default Home;
