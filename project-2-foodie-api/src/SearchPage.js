import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SearchPage () {
    const [geo, setGeo] = useState(null);
    const [list, setList] = useState(null);

    const params = useParams();
    const cityName = encodeURI(params.city);
    const cityURL = `https://travel-advisor.p.rapidapi.com/locations/search?query=${cityName}&limit=5&offset=0&units=km&currency=USD&sort=relevance&lang=en_US`;
    const apiKey = {
        headers: {
            'X-RapidAPI-Key': '50260d1ca6msh1edde9c771d70abp1ffa8fjsn5929da97f103'
        }
    };

    useEffect (() => {
        // fetch (cityURL, apiKey)
        // .then (resp => resp.json())
        // .then ((geo) => {
        //     const locationID = geo.data[0].result_object.location_id;
        //     const listURL = `https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${locationID}&currency=USD&lunit=km&limit=30&lang=en_US`;
        //     fetch(listURL, apiKey)
        //     .then (rs => rs.json())
        //     .then (r => setList(r))
        // })
    }, []);

    // return (
    //     <h1>{params.city}</h1>
    //     if (list) {
    //         console.log(list)
    //         if (list) {
    //             return list.data.map ((rest) => {
    //                 return <div>{rest.name}</div>
    //             })
    //         }
    //     }
    // )
}

export default SearchPage;