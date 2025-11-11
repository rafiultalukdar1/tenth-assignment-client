import React, { useEffect, useState } from 'react';
import UpEventCard from './UpEventCard';
import useAxios from "../../context/useAxios";

const UpcomingEvents = () => {
    // const axios = useAxios();
    // const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     axios.get('/upcoming-events')
    //         .then(res => setEvents(res.data))
    //         .catch(err => console.error(err));
    // }, [axios]);


    const axios = useAxios();
    const [events, setEvents] = useState([]);
    useEffect(() => {
        axios.get('/upcoming-events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, [axios]);

    useEffect(() => {
        const interval = setInterval(() => {
            setEvents(prev => prev.filter(event => new Date(event.event_date) > new Date()));
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className='py-[50px] md:py-[70px]'>
            <div className='container'>
                <h2 className='text-center text-[32px] sm:text-[40px] lg:text-[50px] font-bold'>
                    Upcoming <span className='bg-linear-to-b from-[#219E64] to-[#5FD68E] bg-clip-text text-transparent'>Events</span>
                </h2>
                <p className='text-center text-[16px] md:text-[18px] font-medium text-[#6D7873]'>
                    Join these amazing events and make a difference in your community
                </p>

                <div className='mt-[35px] md:mt-[50px]'>
                    <UpEventCard events={events} />
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;