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
                
                setRestaurant(data)
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {getRestaurants();}, []);

    const loaded = () => {
        console.log(restaurant);
        return (
            <section className='container'>
            {restaurant.results.map((name) => {
                return (
                    <Link to={`/starship/${ starship.name }`} key={ starship.name }>
                        <div className="card">
                            <div className="card-title">
                                <h3>{starship.name}</h3>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </section>
        )
            
   

    return (
        
        <>Home</>
       


    
    
    
        )
    }
}




    


fetch('./data.json')
.then(resp => resp.json())
.then((data) => {console.log(data)})
.catch(err => console.error(err))

export default Home;
