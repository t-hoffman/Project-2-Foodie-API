import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import FetchRestaurantData from './FetchRestaurantData';
import './RestaurantPage.css';

const travelAPI = {
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_TRIP_API_KEY
    }
};

function fetchData (url, options, cb) {
    fetch (url, options)
    .then (resp => resp.json())
    .then (json => cb (json.data))
    .catch (err => console.error(err));
}

function fetchYelpData (url, cb) {
    const options = {
        method: 'GET',
        headers: {
            'Target-URL': url, // Yelp API URL
            'Authorization': 'Bearer ' + process.env.REACT_APP_YELP_API_KEY,
        }
    };

    fetch ('https://us-central1-cors-proxy-ebc24.cloudfunctions.net/app', options)
    .then (resp => resp.json())
    .then (json => cb (json))
    .catch (err => console.error(err));
}

function PhotoCarousel (props) {
    const [pics, setPics] = useState(null);
    const restaurantData = props.data;
    
    function fetchPhotos(restaurant) {
        if (!pics) {
            const locID = restaurant.location_id;
            const resultID = locID ? locID : restaurant.result_object.location_id;
            const photoURL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${resultID}&currency=USD&limit=50&lang=en_US`;
            fetchData (photoURL, travelAPI, (picData) => {
                if (picData.length > 0) setPics(picData);
                if (picData.length < 1) setPics('none');
            });
        }
    }

    if (restaurantData && restaurantData !== 'none') {
        fetchPhotos(props.data)
    } else if (restaurantData === 'none') {
        return <h2>Sorry, no photo results.</h2>
    }

    if (pics && pics !== 'none' && pics.length > 0) {
        return (<><h3>Photos ({restaurantData.name ? restaurantData.name : restaurantData.result_object.name} - {pics.length}):</h3>
        {
            <Carousel variant="dark">
        {
            pics.map (pic => {
                return (
                    <Carousel.Item>
                        <img src={pic.images.large.url} height="100%" />
                    </Carousel.Item>
                )
            })
        }
            </Carousel>
        }
        </>)
    } else {
        return !pics ? <h3>Loading photos ...</h3> : (pics && pics === 'none' && <h3>Sorry, no results for photos.</h3>)
    }
}

function Reviews (props) {
    const [yelpRev, setYelpRev] = useState(null);
    const [tripRev, setTripRev] = useState(null);
    const yelpRevURL = `https://api.yelp.com/v3/businesses/${props.yelpData.id}/reviews?limit=20&sort_by=yelp_sort`;

    if (props.yelpData && !yelpRev) {
        fetchYelpData(yelpRevURL, setYelpRev);
    }

    useEffect(() => {
        if (props.tripData && !tripRev) {
            const tripURL = `https://travel-advisor.p.rapidapi.com/reviews/list?location_id=${props.tripData.location_id}&limit=20&currency=USD&lang=en_US`;
            fetchData(tripURL, travelAPI, setTripRev);
        }
    }, []);

    function tripReviews() {
        if (tripRev) {
            return tripRev.map((rev) => {
                let userRating = [];
                for (let i = 0; i < parseInt(rev.rating); i++) {
                    userRating.push(i);
                }

                const profLink = rev.user.avatar.large.url ? rev.user.avatar.large.url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                
                return (<>
                <div class="review-title">
                    <div className="avatar" style={{backgroundImage:`url(${profLink})`}}></div>
                    <div class="user-info"><h4>{rev.user.username}</h4>
                    {
                        userRating.map((i) => {
                            return <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Five_Pointed_Star_Solid.svg/2175px-Five_Pointed_Star_Solid.svg.png" width="15px" />
                        })
                    }
                    </div>
                </div>
                <div class="review-content">{rev.text}</div>
                </>)
            })
        }
    }

    if (yelpRev && yelpRev.reviews) {
        return (<>
            <div className="review-header"><h2><sub style={{color:'#EF0B12'}}>yelp</sub> Reviews</h2></div>
            {
                yelpRev.reviews.map((rev) => {
                    let userRating = [];
                    for (let i = 0; i < rev.rating; i++) {
                        userRating.push(i);
                    }

                    const profLink = rev.user.image_url ? rev.user.image_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'

                    return (<>
                    <div class="review-title">
                        <div className="avatar" style={{backgroundImage:`url(${profLink})`}}></div>
                        <div class="user-info"><h4>{rev.user.name}</h4>
                        {
                            userRating.map((i) => {
                                return <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Five_Pointed_Star_Solid.svg/2175px-Five_Pointed_Star_Solid.svg.png" width="15px" />
                            })
                        }
                        </div>
                    </div>
                    <div class="review-content">{rev.text}</div>
                    </>
                    )
                })
            }
            <div className="review-header"><h2><sub style={{color:'#32DFA2'}}>tripadvisor</sub> Reviews</h2></div>
            {
                tripReviews()
            }
        </>)
    } else if (tripRev) {
        return (<>
            <div className="review-header"><h2><sub style={{color:'#32DFA2'}}>tripadvisor</sub> Reviews</h2></div>
            {
                tripReviews()
            }
        </>)
    }
}

function RestaurantPage () {
    const { id, name, city, state, lat, long } = useParams();
    const [data, setData] = useState(null);
    const [yelpData, setYelpData] = useState(null);
    const params = useParams();

    const options = {...params, passData: (info) => setData(info)};

    FetchRestaurantData (options);

    useEffect(() => {
        const yelpURL = `https://api.yelp.com/v3/businesses/${id}`;
        fetchYelpData(yelpURL, setYelpData);
    }, []);

    if (yelpData && data) {
        let categories = '';
        if (yelpData.categories) {
            yelpData.categories.forEach((cat, i) => {
                categories += (i === yelpData.categories.length-1 ? cat.title : cat.title + ', ');
            })
        }

        const tripRatingInfo = data !== 'none' ? <div style={{padding:'12px 0 0 10px'}}>{yelpData.review_count.toLocaleString('en-US')} reviews<br /> <p style={{paddingTop:'5px'}}>{data.num_reviews} reviews, {data.ranking}</p></div> : ''
    return (
    <>
        <div className="title-container">
            <div><img src={yelpData.image_url} width="125px" /></div>
            <div style={{paddingLeft: '10px', width:'100%'}}><h1>{name}</h1>
            <span>Phone: {yelpData.display_phone}</span><br />
            <span>{yelpData.location.display_address[0]}</span><br /><span>{yelpData.location.display_address[1]}</span><br />
            <span style={{fontFamily: "'Merriweather', sans-serif"}}><b>Price: <span style={{color:'indianred'}}>{yelpData.price}</span></b></span></div>
            <div className="categories">{categories}</div>
        </div>
        <div className="title-container" style={{marginTop:'15px'}}>
            <div style={{textAlign:'right', fontSize:'16pt'}}><sub style={{color:'#EF0B12'}}>yelp<img src="https://logos-world.net/wp-content/uploads/2020/12/Yelp-Logo.png" height="15px" /></sub><br />
            <sub style={{color:'#32DFA2'}}>tripadvisor <img src="https://w7.pngwing.com/pngs/70/397/png-transparent-tripadvisor-logo-hotel-hotel-miscellaneous-beach-logo-thumbnail.png" height="20px" /></sub>
            </div>
            <div style={{padding:'12px 0 0 10px'}}>{yelpData.rating}<br /> <p style={{paddingTop:'5px'}}>{data.rating}</p></div>
            {tripRatingInfo}
        </div>
        <div style={{paddingTop:'15px'}}>
            {data.description}
        </div>
        <div style={{paddingTop:'15px'}}>
            <PhotoCarousel data={data} />
        </div>
        <div>
            <Reviews 
                yelpData={yelpData}
                tripData={data}
            />
        </div>
    </>)
    } else {
        return <h2>Loading ...</h2>
    }
}

export default RestaurantPage;