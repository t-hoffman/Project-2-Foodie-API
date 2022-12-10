import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RestaurantCard (props) {
    const { id, name } = props;

    return <><b><Link to={`/test/${id}`}>{name}</Link></b><br /></>
}

function SearchPage () {
    const [list, setList] = useState(null);

    const params = useParams();
    const cityName = encodeURI(params.city);
    const cityURL = `https://travel-advisor.p.rapidapi.com/locations/search?query=${cityName}&limit=5&offset=0&units=km&currency=USD&sort=relevance&lang=en_US`;
    const apiKey = {
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_TRIP_API_KEY
        }
    };

    function fetchData (url, options, cb) {
        fetch (url, options)
        .then (resp => resp.json())
        .then (json => cb (json))
        .catch (err => console.log(err));
    }

    useEffect (() => {

        fetchData (cityURL, apiKey, (geo) => {
            const locationID = geo.data[0].result_object.location_id;
            const listURL = `https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${locationID}&currency=USD&lunit=km&limit=30&lang=en_US`;
            fetchData (listURL, apiKey, setList)
        })
    }, [params]);

    if (list) {
        console.log(list)
        return (
            <>
            <h1>{params.city}</h1>
            {
            list.data.map ((rest) => {
                if (rest.name) {
                    return <RestaurantCard 
                                id={rest.location_id}
                                name={rest.name} />
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