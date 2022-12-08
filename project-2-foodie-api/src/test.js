import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Images (props) {

}

function Test () {
    const [data, setData] = useState(null);
    const params = useParams();
    
    function fetchData (url, options, cb) {
        fetch (url, options)
        .then (resp => resp.json())
        .then (json => cb (json))
        .catch (err => console.log(err));
    }

    const apiKey = {
        headers: {
            'X-RapidAPI-Key': '50260d1ca6msh1edde9c771d70abp1ffa8fjsn5929da97f103'
        }
    };

    useEffect (() => {
        fetchData (`https://travel-advisor.p.rapidapi.com/photos/list?location_id=${params.id}&currency=USD&limit=20&lang=en_US`, apiKey, setData);
    }, [params]);

    if (data) {
        return data.data.map ((img) => {
            return <img src={img.images.medium.url} />
        })
    }
}

export default Test;