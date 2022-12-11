import FetchRestaurantData from './FetchRestaurantData';
import { useState, useEffect } from 'react';

function Component () {
    const [data, setData] = useState(null);

    const options = {
        name: encodeURIComponent('The Butcher, The Baker, The Cappuccino Maker'),
        city: encodeURIComponent('West Hollywood'),
        state: encodeURIComponent('CA'),
        lat: encodeURIComponent('34.0921328'),
        long: encodeURIComponent('-118.3805803'),
        passData: (info) => {
            setData (info);
        }
    };

    FetchRestaurantData (options);
    console.log(data)

    if (data) {
        return <><h1>{data.name}</h1></>
    }
}

export default Component;