import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import FetchRestaurantData from './FetchRestaurantData';

const travelAPI = {
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_TRIP_API_KEY
    }
};

function fetchData (url, options, cb) {
    fetch (url, options)
    .then (resp => resp.json())
    .then (json => cb (json.data))
    .catch (err => console.error(err));
}

function fetchYelpData (url, cb) {
    const options = {
        method: 'GET',
        headers: {
            'Target-URL': url, // Yelp API URL
            'Authorization': 'Bearer ' + process.env.REACT_APP_YELP_API_KEY,
        }
    };

    fetch ('https://thoffman-corsproxy.herokuapp.com/', options)
    .then (resp => resp.json())
    .then (json => cb (json))
    .catch (err => console.error(err));
}

function PhotoCarousel (props) {
    const [pics, setPics] = useState(null);
    const restaurantData = props.data;
    
    function fetchPhotos(restaurant) {
        if (!pics) {
            const locID = restaurant.location_id;
            const resultID = locID ? locID : restaurant.result_object.location_id;
            const photoURL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${resultID}&currency=USD&limit=50&lang=en_US`;
            fetchData (photoURL, travelAPI, setPics); console.log('RUN_API_PICS',pics)
        }
    }

    if (restaurantData && restaurantData !== 'none') {
        fetchPhotos(props.data)
    }
    // } else if (restaurantData === 'none') {
    //     return <h2>Sorry, no photo results.</h2>
    // }

    if (pics && pics !== 'none' && pics.length > 0) {
        return (<><h3>Photos ({restaurantData.name ? restaurantData.name : restaurantData.result_object.name} - {pics.length}):</h3>
        {
            <Carousel variant="dark">
        {
            pics.map (pic => {
                return (
                    <Carousel.Item>
                        <img src={pic.images.large.url} height="100%" />
                    </Carousel.Item>
                )
            })
        }
            </Carousel>
        }
        </>)
    } else {
        return pics && pics === 'none' || pics ? <h3>Sorry, no results for photos.</h3> : <h3>Loading photos ...</h3>
    }
}

function RestaurantPage () {
    const { id, name, city, state, lat, long } = useParams();
    const [data, setData] = useState(null);
    const [yelpData, setYelpData] = useState(null);
    const params = useParams();

    const options = {...params, passData: (info) => setData(info)};

    FetchRestaurantData (options);

    useEffect(() => {
        const yelpURL = `https://api.yelp.com/v3/businesses/${id}`;
        fetchYelpData(yelpURL, setYelpData);console.log('RUN_API_YELP')
    }, []);

    console.log(yelpData);

    return (
    <>
        <h1>{name}</h1>
        
        <PhotoCarousel data={data} />
    </>)

}

export default RestaurantPage;