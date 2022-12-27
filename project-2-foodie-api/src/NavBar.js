import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

function Result (props) {
    return <Link to={`/search/${props.name}`}>{props.name}</Link>
}

function SearchResults (props) {
    const [data, setData] = useState(null);
    const query = props.query;

    async function fetchCities (cb) {
        fetch ('/Cities.json')
        .then (resp => resp.json())
        .then (json => { cb (json) })
        .catch (err => console.error('error: ', err));
    }

    useEffect(() => {
        fetchCities(json => setData(json));
    }, []);
    
    if (data) {
        let count = 0;
        return Object.keys(data).map((state) => {
            return data[state].filter ((q) => {
                if (q.toLowerCase().includes(query.toLowerCase()) && query && count < parseInt(props.count)) {
                    count++;
                    return q;
                }
            }).map (i => {
                return <Result name={i} />
            })
        })
    }
}

// Yelp Autocomplete or live restaurant search in Los Angeles, CA
// function SearchResults (props) {
//     const { query } = props;
//     const [data, setData] = useState(null);

//     const proxyURL = process.env.REACT_APP_PROXY_URL;
//     const apiKey = process.env.REACT_APP_YELP_API_KEY;

//     function fetchAutocomplete (url, cb) {
//         const options = {
//             method: 'GET',
//             headers: {
//                 'Target-URL': url, // Yelp API URL
//                 'Authorization': 'Bearer ' + apiKey,
//             }
//         };
        
//         fetch (proxyURL, options)
//         .then (resp => resp.json())
//         .then (json => cb (json))
//         .catch (err => console.log(err));
//     }

//     useEffect (() => {
//         if (query) {
//             //const url = `https://api.yelp.com/v3/autocomplete?text=${query}`;
//             const url = `https://api.yelp.com/v3/businesses/search?location=Los%20Angeles,%20CA&term=${encodeURIComponent(query)}&categories=bar%2Crestaurant%2Cfood%2Crestaurants&locale=en_US&sort_by=best_match&limit=20`;
//             fetchAutocomplete(url, setData);
//             console.log(data)
//         }
//     }, [query]);

//     if (data) {
//         return data.businesses.map (item => {
//             return <div>{item.name}</div>
//         });
        
//     }
// }

function NavBar () {
    const refLinks = useRef(null);
    const refSearch = useRef(null);
    const [query, setQuery] = useState('');

    function toggleView (event) {
        const searchInput = document.querySelector('#search').value;
        
        if (event !== 'search' && event !== 'none' && event.target.id === 'icon') {
            const linkDisplay = refLinks.current.style.display;
            refLinks.current.style.display = linkDisplay === 'block' ? 'none' : 'block';
        } else if (event === 'search') {
            const searchInput = document.querySelector('#search').value;

            if (searchInput === '') {
                refSearch.current.style.display = 'none';
            } else {
                refSearch.current.style.display = 'block';
            }
        } else {
            refLinks.current.style.display = refLinks.current.style.display ? 'none' : '';
            if (event.type === 'click') refSearch.current.style.display = 'none';
            if (event && event.type === 'keyup') {
                const noResults = document.querySelector('.no-results');
                const results = refSearch.current.children.length;

                if (results <= 1 && searchInput.length > 0) {
                    noResults.style.display = 'block';
                } else if (results > 1) {
                    noResults.style.display = 'none';
                }
            }

            if (event.key === 'Enter') alert('hi')
        }
    }
    
    useEffect (() => {
        document.addEventListener('click', (e) => toggleView(e));
        document.addEventListener('keyup', (e) => toggleView(e));
        const logo = document.querySelector('.logo');
        logo.addEventListener('click', () => { window.location = '/'; })
    }, []);

    return (
        <>
        <div className="foodie-navbar">
            <div className="logo">
                <Link to="/">foodie</Link></div>
            <div className="nav-search-container">
                <div className="nav-search">
                    <div className="nav-search-input">
                        <input 
                            type="text" 
                            placeholder="search ..."
                            onChange={(e) => { setQuery(e.target.value); toggleView('search'); }}
                            value={query}
                            id="search"
                            autoComplete="off" />
                        <i className="fa fa-bars icon" id="icon" ></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="search" id="search" ref={refSearch}>
            <SearchResults
                query={query}
                count="15" />
                <div className="no-results">No results found ...</div>
        </div>
        <div 
            className="nav-links" 
            id="nav-links" 
            ref={refLinks}>
            <Link to="/">Home</Link>
            <Link to="/restaurants">Restaurants</Link>
        </div>
        </>
    )
}

export default NavBar;