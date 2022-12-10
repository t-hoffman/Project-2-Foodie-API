import './SearchPage.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RestaurantCard (props) {
    const { id, name, city, state, lat, long, restData } = props;
    const params = `${id}/${name}/${city}/${state}/${lat}/${long}`;

    return (
            <div className="rest-card">
                <div><img src={restData.image_url} width="125px" style={{borderRadius: '5px'}} /></div>
                <div className="rest-card container">
                    <div style={{width: '100%'}}><h3><Link to={`/test/${params}`}>{name}</Link></h3></div>
                    <div style={{width: '100%'}}>{restData.location.address1} {restData.location.city}, {restData.location.state}</div>
                    <div style={{width: '100%'}}>{restData.price} {restData.display_phone}</div>
                </div>
            </div>
    )
}

function SearchPage () {
    const [list, setList] = useState(null);

    const params = useParams();
    const cityName = encodeURIComponent(params.city);
    const proxyURL = 'https://thoffman-corsproxy.herokuapp.com/';
    const yelpURL = `https://api.yelp.com/v3/businesses/search?location=${cityName}&term=restaurants&sort_by=best_match&limit=20`;
    const apiKey = process.env.REACT_APP_YELP_API_KEY;

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
                                    city={rest.location.city}
                                    state={rest.location.state}
                                    lat={rest.coordinates.latitude}
                                    long={rest.coordinates.longitude}
                                    restData={rest} />
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