import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';


const proxyURL = 'https://thoffman-corsproxy.herokuapp.com/';
const LA_URL = 'https://api.yelp.com/v3/businesses/search?location=los%20angeles%2C%20ca&term=restaurants&sort_by=best_match&limit=20';
const apiKey = process.env.REACT_APP_YELP_API_KEY;


const options = {
    method: 'GET',
    headers: {
        'Target-URL': LA_URL, // Yelp API URL
        'Authorization': 'Bearer ' + apiKey,
    }
};








const HomeCarousel = () => {
    
    const [ restaurantImg, setRestaurantImg ] = useState(null)
    
    const getRestaurantImg = async () => {
        try{
            const response = await fetch(proxyURL, options);
            const data = await response.json();
                console.log('home fetch', response)
            setRestaurantImg(data)

            console.log("a", setRestaurantImg(data))
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getRestaurantImg();
        }, []);

        // console.log("sav", restaurantImg);
        // return;
        if (restaurantImg) {

      
    return restaurantImg.businesses[0].image_url ? (
            
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  ) : (
    <p>Loading...</p>
    );
}
}



    export default HomeCarousel