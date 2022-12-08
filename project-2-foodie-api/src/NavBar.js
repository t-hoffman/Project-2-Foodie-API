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
                    return q;
                }
            }).map (i => {
                return <Result name={i} />
            })
        })
    }
}

function NavBar () {
    const refLinks = useRef(null);
    const refSearch = useRef(null);
    const [query, setQuery] = useState('');
    
    function toggleLinks (event) {
        if (event && event !== 'search' && event !== 'none' && event.target.id === 'icon') {
            const linkDisplay = refLinks.current.style.display;
            refLinks.current.style.display = linkDisplay === 'block' ? 'none' : 'block';
        } else if (event && event !== 'search' && event.target.id !== 'icon') {
            refLinks.current.style.display = 'none';
            refSearch.current.style.display = 'none';
        } else if (event === 'search') {
            refSearch.current.style.display = 'block';
            const noResults = document.querySelector('.no-results');
            const results = refSearch.current.children.length;

            if (results <= 1 && query.length > 0) {
                noResults.style.display = 'block';
            } else if (results > 1) {
                noResults.style.display = 'none';
            }
        }
    }
    
    useEffect (() => {
        document.addEventListener('click', toggleLinks);
        document.querySelector('.icon').addEventListener('click', () => toggleLinks());
    }, []);

    return (
        <>
        <div className="navbar">
            <div className="logo">
                <Link to="/">foodie</Link></div>
            <div className="nav-search-container">
                <div className="nav-search">
                    <div className="nav-search-input">
                        <input 
                            type="text" 
                            placeholder="search ..."
                            onChange={(e) => { setQuery(e.target.value); toggleLinks('search'); }}
                            value={query}
                            id="search" />
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