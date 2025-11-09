import React from 'react';
import { useLoaderData } from 'react-router';

const EventDetails = () => {
    
    const event = useLoaderData();

    const {_id, title} = event

    return (
        <div>
            <h2>{title}</h2>
            <p>{_id}</p>
        </div>
    );
};

export default EventDetails;