import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

function Images (props) {
    const { id, name, city, state, lat, long } = useParams();
    const [restaurantData, setRestaurantData] = useState(null);
    const [pics, setPics] = useState(null);
    
    function fetchRestaurantData () {
        const travelURL = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${long}&limit=30&currency=USD&distance=2&lunit=km&lang=en_US`;
        const nameURL = `https://travel-advisor.p.rapidapi.com/locations/search?query=${name} ${city} ${state}&limit=30&offset=0&units=km&currency=USD&sort=restaurants&lang=en_US`;

        fetchData (travelURL, travelAPI, (coord) => {
            fetchData (nameURL, travelAPI, (byname) => {
                setRestaurantData ([...coord, ...byname]);
            })
        });
    }
console.log('DATA: ',restaurantData)

    function fetchPhotos () {
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
                fetchData (photoURL, travelAPI, setPics);
            } else {  setPics ('none'); }
        } else { setPics('none') }
    }

    useEffect (() => {
        fetchRestaurantData ();
    }, []);
    
    useEffect (()=> {
        if (restaurantData) fetchPhotos ();
    }, [restaurantData])

console.log('PICS: ',pics)

    if (pics && pics !== 'none' && pics.length > 0) {
        return (<><h3>Photos ({pics[0].locations[0].name}):</h3>
        {
            pics.map (pic => {
                return <><img src={pic.images.medium.url} /></>
            })
        }
        </>)
    } else {
        return pics && pics === 'none' || pics ? <h3>Sorry, no results for photos.</h3> : <h3>Loading ...</h3>
    }
}

function Test () {
    const { name, city, state, lat, long } = useParams();

        return (<><h1>{name}</h1>
        <Images />
        </>)

}

export default Test;