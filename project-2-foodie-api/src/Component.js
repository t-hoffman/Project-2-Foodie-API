import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

function FetchRestaurantData () {
    const [restaurantData, setRestaurantData] = useState(null);
    const [restaurant, setRestaurant] = useState (null);
    const { id, name, city, state, lat, long } = useParams();

    useEffect (() => {
        const travelURL = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${long}&limit=30&currency=USD&distance=2&lunit=km&lang=en_US`;
        const nameURL = `https://travel-advisor.p.rapidapi.com/locations/search?query=${name} ${city} ${state}&limit=30&offset=0&units=km&currency=USD&sort=restaurants&lang=en_US`;

        fetchData (travelURL, travelAPI, (coord) => {
            fetchData (nameURL, travelAPI, (byname) => {
                setRestaurantData ([...coord, ...byname]);
            })
        });
    }, []);

    useEffect (() => {
        const similarity = require ('string-similarity');
        let results = [];
        
        restaurantData.forEach((r, i) => {
            const resultName = r.result_object ? r.result_object.name.toLowerCase() : (r.name ? r.name.toLowerCase() : '');
            if (r.result_type === 'restaurants' || !r.result_type) results.push(resultName.toLowerCase());
        });

        if (results.length > 0) {
            const result = similarity.findBestMatch(name.toLowerCase(), results);
            console.log('LIST/MATCHES: ', restaurantData, results, result);
            if (result.bestMatch.rating > 0.49) {
                const locID = restaurantData[result.bestMatchIndex].location_id;
                const resultID = locID ? locID : restaurantData[result.bestMatchIndex].result_object.location_id;
                const photoURL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${resultID}&currency=USD&limit=50&lang=en_US`;
                fetchData (photoURL, travelAPI, setRestaurant);
            } else {  setRestaurant ('none'); }
        } else { setRestaurant('none') }
    }, [restaurantData]);
}

function Component () {
    return <>Hello World!</>
}

export default Component;