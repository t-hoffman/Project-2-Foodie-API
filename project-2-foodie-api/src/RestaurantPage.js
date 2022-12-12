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

    fetch ('https://thoffman-corsproxy.herokuapp.com/', options)
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
            fetchData (photoURL, travelAPI, setPics); console.log('RUN_API_PICS',pics)
        }
    }

    if (restaurantData && restaurantData !== 'none') {
        fetchPhotos(props.data)
    }
    // } else if (restaurantData === 'none') {
    //     return <h2>Sorry, no photo results.</h2>
    // }

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
        return pics && pics === 'none' || pics ? <h3>Sorry, no results for photos.</h3> : <h3>Loading photos ...</h3>
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
        console.log('RUN_API_YELP')
    }, []);

    // const yelpData = {
    //     "id": "cal0Wpupxj9c_AV7WzDXsw",
    //     "alias": "granville-west-hollywood-2",
    //     "name": "GRANVILLE",
    //     "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/znY6Wq1711cPvOtfKxWZZg/o.jpg",
    //     "is_claimed": true,
    //     "is_closed": false,
    //     "url": "https://www.yelp.com/biz/granville-west-hollywood-2?adjust_creative=S2Ywzrk-Ow__n-DLVtG7dA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=S2Ywzrk-Ow__n-DLVtG7dA",
    //     "phone": "+14245225161",
    //     "display_phone": "(424) 522-5161",
    //     "review_count": 2306,
    //     "categories": [
    //         {
    //             "alias": "newamerican",
    //             "title": "American (New)"
    //         },
    //         {
    //             "alias": "cocktailbars",
    //             "title": "Cocktail Bars"
    //         }
    //     ],
    //     "rating": 4.5,
    //     "location": {
    //         "address1": "8701 Beverly Blvd",
    //         "address2": null,
    //         "address3": "",
    //         "city": "West Hollywood",
    //         "zip_code": "90048",
    //         "country": "US",
    //         "state": "CA",
    //         "display_address": [
    //             "8701 Beverly Blvd",
    //             "West Hollywood, CA 90048"
    //         ],
    //         "cross_streets": ""
    //     },
    //     "coordinates": {
    //         "latitude": 34.0771299,
    //         "longitude": -118.38068
    //     },
    //     "photos": [
    //         "https://s3-media2.fl.yelpcdn.com/bphoto/znY6Wq1711cPvOtfKxWZZg/o.jpg",
    //         "https://s3-media4.fl.yelpcdn.com/bphoto/qGD8HfgyBHitlnbjyRNB7Q/o.jpg",
    //         "https://s3-media1.fl.yelpcdn.com/bphoto/97EiWbz49hzIMI5dzBnvFQ/o.jpg"
    //     ],
    //     "price": "$$",
    //     "hours": [
    //         {
    //             "open": [
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1130",
    //                     "end": "2100",
    //                     "day": 0
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1130",
    //                     "end": "2100",
    //                     "day": 1
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1130",
    //                     "end": "2100",
    //                     "day": 2
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1130",
    //                     "end": "2100",
    //                     "day": 3
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1130",
    //                     "end": "2200",
    //                     "day": 4
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1100",
    //                     "end": "2200",
    //                     "day": 5
    //                 },
    //                 {
    //                     "is_overnight": false,
    //                     "start": "1100",
    //                     "end": "2100",
    //                     "day": 6
    //                 }
    //             ],
    //             "hours_type": "REGULAR",
    //             "is_open_now": true
    //         }
    //     ],
    //     "transactions": [
    //         "restaurant_reservation",
    //         "delivery",
    //         "pickup"
    //     ],
    //     "messaging": {
    //         "url": "https://www.yelp.com/raq/cal0Wpupxj9c_AV7WzDXsw?adjust_creative=S2Ywzrk-Ow__n-DLVtG7dA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=S2Ywzrk-Ow__n-DLVtG7dA#popup%3Araq",
    //         "use_case_text": "Message the Business"
    //     },
    //     "special_hours": [
    //         {
    //             "date": "2022-12-25",
    //             "is_closed": true,
    //             "start": null,
    //             "end": null,
    //             "is_overnight": null
    //         },
    //         {
    //             "date": "2022-12-26",
    //             "is_closed": true,
    //             "start": null,
    //             "end": null,
    //             "is_overnight": null
    //         }
    //     ]
    // };

    //console.log(yelpData);

    if (yelpData && data) {
        console.log(data)
        let categories = '';
        if (yelpData.categories) {
            yelpData.categories.forEach((cat, i) => {
                categories += (i === yelpData.categories.length-1 ? cat.title : cat.title + ', ');
            })
        }
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
            <div style={{padding:'12px 0 0 10px'}}>{yelpData.review_count.toLocaleString('en-US')} reviews<br /> <p style={{paddingTop:'5px'}}>{data.num_reviews} reviews, {data.ranking}</p></div>
        </div>
        <div style={{paddingTop:'15px'}}>
        {data.description}
        <div style={{paddingTop: '15px'}}>
        {/* GRANVILLE is a collection of modern-casual restaurants specializing in wholesome hand-crafted recipes and libations. With warm hospitality, good vibes, globally-inspired food and music - we are a culture, not a concept. GRANVILLE can be described as an experiment in humanity. We believe that fostering a culture of love, gratitude and integrity is the way of life, and business. We support local, organic and certified humane practices whenever possible and make our food from scratch daily. We offer lunch, dinner, weekend breakfast and full bar in a casual yet tasteful environment. */}
        </div>
        <PhotoCarousel data={data} />
        </div>
    </>)
    } else {
        return <h2>Loading ...</h2>
    }
}

export default RestaurantPage;