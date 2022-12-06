// URLS / API Key
const proxyURL = 'https://thoffman-corsproxy.herokuapp.com/';
const LA_URL = 'https://api.yelp.com/v3/businesses/search?location=los%20angeles%2C%20ca&term=restaurants&sort_by=best_match&limit=20';
const apiKey = 'zU4QuOhJoqNzQwtn3GOKS2hHhX2zfsEy_JQvQg4O0mI5fyPFLCr4Q3NYUwAmdm06Jtw7QPG-MxBgS7CP-gVqzcdmGid3bjR9clpCI_9xArhMljNrpd6xVjJV2XyOY3Yx';

// Fetch Data
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

// can do it this way:

// fetchData (LA_URL, (data) => {
//     console.log(data);
// })

// or the regular way:

const options = {
    method: 'GET',
    headers: {
        'Target-URL': LA_URL, // Yelp API URL
        'Authorization': 'Bearer ' + apiKey,
    }
};

fetch (proxyURL, options)
.then (resp => resp.json())
.then (json => console.log(json))
.catch (err => console.error(err));