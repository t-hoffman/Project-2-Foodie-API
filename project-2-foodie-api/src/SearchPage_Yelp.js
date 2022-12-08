import './SearchPage.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RestaurantCard (props) {
    const { id, name, lat, long } = props;
    const params = `${id}/${name}/${lat}/${long}`;

    return <><b><Link to={`/test/${params}`}>{name}</Link></b><br /></>
}

function SearchPage () {
    const [list, setList] = useState(null);

    const params = useParams();
    const cityName = encodeURIComponent(params.city);
    const proxyURL = 'https://thoffman-corsproxy.herokuapp.com/';
    const yelpURL = `https://api.yelp.com/v3/businesses/search?location=${cityName}&term=restaurants&sort_by=best_match&limit=20`;
    const apiKey = 'zU4QuOhJoqNzQwtn3GOKS2hHhX2zfsEy_JQvQg4O0mI5fyPFLCr4Q3NYUwAmdm06Jtw7QPG-MxBgS7CP-gVqzcdmGid3bjR9clpCI_9xArhMljNrpd6xVjJV2XyOY3Yx';

    function fetchData (url, cb) {
        const options = {
            method: 'GET',
            headers: {
                'Target-URL': url, // Yelp API URL
                'Authorization': 'Bearer ' + apiKey,
            }
        };
    
        fetch (proxyURL, options)
        .then (resp => resp.json())
        .then (json => cb (json))
        .catch (err => console.error(err));
    }

    useEffect (() => {
        fetchData (yelpURL, setList)
    }, [params]);

    if (list) {
        console.log(list)
        return (
            <>
            <h1>{params.city}</h1>
            {
            list.businesses.map ((rest) => {
                if (rest.name) {
                    // rest.coordinates.latitude.toFixed(3)
                    return <RestaurantCard 
                                id={rest.id}
                                name={rest.name}
                                lat={rest.coordinates.latitude}
                                long={rest.coordinates.longitude} />
                }
            })
            }
        </>
        )
    } else {
        return <h1>Loading ...</h1>
    }
}

export default SearchPage;