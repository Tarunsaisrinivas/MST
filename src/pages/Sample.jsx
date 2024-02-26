import React, { useState } from 'react';

const Sample = () => {
    const [show, setShow] = useState(false);

    const handle = () => {
        setShow(!show);
    }

    return (
        <div>
            <button onClick={handle}>
                Toggle
            </button>
            {show && 
                <div>Hello, World!</div>
            }
        </div>
    );
}

export default Sample;
