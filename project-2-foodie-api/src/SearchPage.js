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
                    <div style={{width: '100%'}}><h3><Link to={`/restaurantpage/${params}`}>{name}</Link></h3></div>
                    <div style={{width: '100%'}}>{restData.location.address1} {restData.location.city}, {restData.location.state}</div>
                    <div style={{width: '100%'}}>{restData.price} {restData.display_phone}</div>
                </div>
            </div>
    )
}

function SearchPage () {
    const [list, setList] = useState(null);
    const [query, setQuery] = useState(null);

    const params = useParams();
    const cityName = encodeURIComponent(params.city);
    const proxyURL = 'https://us-central1-cors-proxy-ebc24.cloudfunctions.net/app';
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

    useEffect (() => {
        if (query) {
            const filterURL = `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(params.city)}&term=${encodeURIComponent(query)}&categories=bar%2Crestaurant%2Cfood%2Crestaurants&locale=en_US&sort_by=best_match&limit=20`;
            fetchData (filterURL, setList);
        }
    }, [query]);

    const debounce = (func, timeout = 400) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }

      function saveInput(e){
        setQuery(e.target.value)
      }
      
      const processChanges = debounce((e) => saveInput(e));

    if (list) {
        return (
            <>
            <h1>{params.city}</h1>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div className="filter-search">
                    <div>
                    Search for restaurants in {params.city}:
                    </div>
                    <div>
                        <div style={{display: 'flex'}}>
                        <input 
                            type="text"
                            id="filter"
                            autoComplete="off"
                            onChange={(e) => { processChanges(e) }}
                        />
                        <div style={{paddingLeft: '10px'}}><button>></button></div>
                        </div>
                    </div>
                </div>
            </div>
            <p></p>
            {
                list && list.businesses.length > 0 ? list.businesses.map ((rest) => {
                    if (rest.name) {
                        return <RestaurantCard 
                                    id={rest.id}
                                    name={rest.name}
                                    city={rest.location.city}
                                    state={rest.location.state}
                                    lat={rest.coordinates.latitude}
                                    long={rest.coordinates.longitude}
                                    restData={rest} />
                    }
                }) : (!list ? <h1>Loading ...</h1> : <h1>Sorry, no results.</h1>)
            }
        </>
        )
    } else {
        return <h1>Loading ...</h1>
    }
}

export default SearchPage;