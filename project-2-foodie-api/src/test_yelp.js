import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const travelAPI = {
    headers: {
        'X-RapidAPI-Key': '50260d1ca6msh1edde9c771d70abp1ffa8fjsn5929da97f103'
    }
};

function fetchData (url, options, cb) {
    fetch (url, options)
    .then (resp => resp.json())
    .then (json => cb (json))
    .catch (err => console.error(err));
}

function Images (props) {
    const { id, name, lat, long } = useParams();
    const [pics, setPics] = useState(null);
    function fetchPhotos () {
        if (props.data) {
            const similarity = require ('string-similarity');
            let results = [];
            
            props.data.data.forEach((r, i) => {
                const resultName = r.name ? r.name.toLowerCase() : '';
                results.push(resultName.toLowerCase());
            });
            if (results.length > 0) {
                const result = similarity.findBestMatch(name.toLowerCase(), results);
                console.log(props.data, results, result)
                if (result.bestMatch.rating > 0.4) {
                    const resultID = props.data.data[result.bestMatchIndex].location_id;
                    const photoURL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${resultID}&currency=USD&limit=50&lang=en_US`;
                    fetchData (photoURL, travelAPI, setPics);
                } else {
                    setPics ('none');
                }
            } else { setPics('none') }
        }
    }

    useEffect (()=> {
        fetchPhotos (props.data);
    }, [props.data])
    
    if (pics && pics !== 'none' && pics.data.length > 0) {console.log('hello')
        return (<><h3>Photos ({pics.data[0].locations[0].name}):</h3>
        {
            pics.data.map (pic => {
                return <><img src={pic.images.medium.url} /></>
            })
        }
        </>)
    } else {
        return pics === 'none' ? <h3>Sorry, no results for photos.</h3> : <h3>Loading ...</h3>
    }
}

function Test () {
    const { name, lat, long } = useParams();
    const [data, setData] = useState(null);
    const travelURL = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${long}&limit=30&currency=USD&distance=2&lunit=km&lang=en_US`;

    useEffect (() => {
        fetchData (travelURL, travelAPI, setData);
    }, [useParams()]);

    if (data) {
        return (<><h1>{name}</h1>
        <Images data={data} />
        </>)
    }
}

export default Test;