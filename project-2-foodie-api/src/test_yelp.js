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

function Images ({passData}) {
    const { id, name, city, state, lat, long } = useParams();
    const [searchData, setSearchData] = useState(null);
    const [restaurantData, setRestaurantData] = useState(null);
    const [pics, setPics] = useState(null);
    
    function fetchRestaurantData () {
        const travelURL = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${long}&limit=30&currency=USD&distance=2&lunit=km&lang=en_US`;
        const nameURL = `https://travel-advisor.p.rapidapi.com/locations/search?query=${name} ${city} ${state}&limit=30&offset=0&units=km&currency=USD&sort=restaurants&lang=en_US`;

        fetchData (travelURL, travelAPI, (coord) => {
            fetchData (nameURL, travelAPI, (byname) => {
                setSearchData ([...coord, ...byname]);
            }); console.log('API_LAT/LONG/NAME_CITY_STATE')
        });
    }
console.log('SEARCH DATA: ',searchData)

    function fetchPhotos () {
        const similarity = require ('string-similarity');
        let results = [];
        
        // searchData.forEach((r, i) => {
        //     const resultName = r.result_object ? r.result_object.name.toLowerCase() : (r.name ? r.name.toLowerCase() : '');
        //     if (r.result_type === 'restaurants' || !r.result_type) results.push(resultName.toLowerCase());
        // });

        const filteredData = searchData.filter ((r, i) => {
            const resultName = r.result_object ? r.result_object.name.toLowerCase() : (r.name ? r.name.toLowerCase() : '');
            if (r.result_type === 'restaurants' || !r.result_type) {
                results.push(resultName.toLowerCase());
                return r;
            }
        })

        if (results.length > 0) {
            const result = similarity.findBestMatch(name.toLowerCase(), results);
            console.log('LIST/MATCHES: ', filteredData, results, result);
            if (result.bestMatch.rating > 0.49) {
                const locID = filteredData[result.bestMatchIndex].location_id;
                const resultID = locID ? locID : filteredData[result.bestMatchIndex].result_object.location_id;
                const photoURL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${resultID}&currency=USD&limit=50&lang=en_US`;
                fetchData (photoURL, travelAPI, setPics); console.log('RUN_API_PICS',pics)
                setRestaurantData (filteredData[result.bestMatchIndex]);
                passData (filteredData[result.bestMatchIndex])
            } else {  setPics ('none'); }
        } else { setPics('none') }
    }

    useEffect (() => {
        if (!searchData) fetchRestaurantData ();
    }, [searchData]);
    
    useEffect (()=> {
        if (searchData) fetchPhotos ();
    }, [searchData])

//console.log('PICS: ',pics)
//console.log('R/DATA:', restaurantData)

    if (pics && pics !== 'none' && pics.length > 0) {
        return (<><h3>Photos ({restaurantData.name ? restaurantData.name : restaurantData.result_object.name}):</h3>
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
    const [data, setData] = useState(null);

    function passData (data) {
        setData(data);
    }
    
    console.log(data)
    return (<><h1>{name}</h1>
    <Images passData={passData} />
    </>)

}

export default Test;