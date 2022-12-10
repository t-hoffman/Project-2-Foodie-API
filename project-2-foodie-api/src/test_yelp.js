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
    .then (json => cb (json))
    .catch (err => console.error(err));
}

function Images (props) {
    const { id, name, city, state, lat, long } = useParams();
    const [pics, setPics] = useState(null);
    function fetchPhotos () {
        if (props.data) {
            const similarity = require ('string-similarity');
            let results = [];
            
            props.data.forEach((r, i) => {
                const resultName = (r.result_object) ? r.result_object.name.toLowerCase() : (r.name ? r.name.toLowerCase() : '');
                results.push(resultName.toLowerCase());
            });
            if (results.length > 0) {
                const result = similarity.findBestMatch(name.toLowerCase(), results);
                console.log(props.data, results, result);
                if (result.bestMatch.rating > 0.4) {
                    const locID = props.data[result.bestMatchIndex].location_id;
                    const resultID = locID ? locID : props.data[result.bestMatchIndex].result_object.location_id;
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
console.log(pics)
    if (pics && pics !== 'none' && pics.data.length > 0) {
        return (<><h3>Photos ({name}):</h3>
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
    const { name, city, state, lat, long } = useParams();
    const [data, setData] = useState(null);
    const travelURL = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${long}&limit=30&currency=USD&distance=2&lunit=km&lang=en_US`;
    const nameURL = `https://travel-advisor.p.rapidapi.com/locations/search?query=${name} ${city} ${state}&limit=30&offset=0&units=km&currency=USD&sort=restaurants&lang=en_US`;
    
    useEffect (() => {
        fetchData (travelURL, travelAPI, (coord) => {
            fetchData (nameURL, travelAPI, (byname) => {
                //const totalData = [...coord.data, ...byname.data];
                const filterData = byname.data.filter ((element) => {
                    if (element.result_type == 'restaurants') return element;
                })
                const totalData = [...coord.data, ...filterData];
                setData (totalData);
            })
        });
    }, [useParams()]);

    if (data) {
        return (<><h1>{name}</h1>
        <Images data={data} />
        </>)
    }
}

export default Test;