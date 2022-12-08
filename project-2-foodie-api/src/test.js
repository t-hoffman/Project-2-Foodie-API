import { useState } from 'react';

function Test () {
    const [state, setState] = useState(null);

    setState(1);
}

export default Test;