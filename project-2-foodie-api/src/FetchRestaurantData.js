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

function FetchRestaurantData (props) {
    const [searchData, setSearchData] = useState(null);
    const { name, city, state, lat, long } = props;

    useEffect (() => {
        if (!searchData) {
            const travelURL = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${long}&limit=30&currency=USD&distance=2&lunit=km&lang=en_US`;
            const nameURL = `https://travel-advisor.p.rapidapi.com/locations/search?query=${name} ${city} ${state}&limit=30&offset=0&units=km&currency=USD&sort=restaurants&lang=en_US`;

            fetchData (travelURL, travelAPI, (coord) => {
                fetchData (nameURL, travelAPI, (byname) => {
                    setSearchData ([...coord, ...byname]);
                })
            });
        }
    }, [searchData]);

    useEffect (() => {
        if (searchData) {
            const similarity = require ('string-similarity');
            let results = [];
            
            const filteredData = searchData.filter ((r, i) => {
                const resultName = r.result_object ? r.result_object.name.toLowerCase() : (r.name ? r.name.toLowerCase() : '');
                if (r.result_type === 'restaurants' || !r.result_type) {
                    results.push(resultName.toLowerCase());
                    return r;
                }
            })

            if (results.length > 0) {
                const result = similarity.findBestMatch(name.toLowerCase(), results);
                if (result.bestMatch.rating > 0.49) {
                    const locID = filteredData[result.bestMatchIndex].location_id;
                    const resultID = locID ? locID : filteredData[result.bestMatchIndex].result_object.location_id;
                    props.passData (filteredData[result.bestMatchIndex])
                } else {  props.passData ('none'); }
            } else { props.passData('none') }
        }
    }, [searchData]);
}

export default FetchRestaurantData;