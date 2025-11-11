import React, { useEffect, useState } from 'react';
import useAuth from '../../context/useAuth';
import useAxios from '../../context/useAxios';
import { CiShoppingTag } from 'react-icons/ci';
import { FaLocationDot, FaRegCalendar } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router';

const ManageEvents = () => {

    const { user } = useAuth();
    const axios = useAxios();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!user?.email) return;
        axios.get(`/my-events?email=${user.email}`)
            .then(res => {
                const now = new Date();
                const sortedEvents = res.data.sort((a, b) => {
                    const aDate = new Date(a.event_date);
                    const bDate = new Date(b.event_date);
                    if (aDate < now && bDate >= now) return 1;
                    if (aDate >= now && bDate < now) return -1;
                    return aDate - bDate;
                });
                setEvents(sortedEvents);
            })
            .catch(err => console.error(err));
    }, [user, axios]);



    return (
        <>
            <div className='py-[50px] md:py-[70px]'>
                <div className='container'>
                    <h2 className='text-center text-[32px] sm:text-[40px] lg:text-[50px] font-bold'>Manage <span className='bg-linear-to-b from-[#219E64] to-[#5FD68E] bg-clip-text text-transparent'>Events</span></h2>
                    <p className='text-center text-[16px] md:text-[18px] font-medium text-[#6D7873]'>Update or delete the events you've organized</p>
                    <div className='max-w-[890px] mx-auto mt-[30px] md:mt-[45px] space-y-7'>
                        {
                            events.map(event => (
                                <div key={event._id} className='flex flex-col md:flex-row border border-[#E1E7EF] dark:border-white rounded-lg lg:rounded-2xl p-4 md:pr-7 lg:items-center gap-5'>
                                    <div className='lg:w-[38%]'>
                                        <img className='rounded-lg lg:rounded-2xl h-[280px] w-full md:w-[300px] object-cover' src={event.thumbnail} alt="" />
                                    </div>
                                    <div className='lg:w-[62%]'>
                                        <p className='inline-flex items-center gap-1.5 py-1 px-3 bg-[#E7F8F2] text-[13px] text-[#10B77F] font-medium rounded-full'><CiShoppingTag /><span>{event.event_type}</span> </p>
                                        <h2 className='text-[20px] md:text-[22px] font-bold text-[#141414] dark:text-white pt-3'>{event.title}</h2>
                                        <p className='pt-1.5 pb-2 text-[16px] text-[#6D7873]'>{event.description.length > 50 ? event.description.slice(0, 55) + '...' : event.description}</p>
                                        <h6 className='mt-2 flex items-center gap-1.5 text-[15px] font-medium'><FaRegCalendar className='text-[16px] text-[#10B77F]'/><span>{new Date(event.event_date).toISOString().split('T')[0]}</span></h6>
                                        <h6 className='mt-2 flex items-center gap-1.5 text-[15px] font-medium'><FaLocationDot className='text-[16px] text-[#10B77F]'/><span>{event.location}</span></h6>

                                        <div className='mt-4 pt-4 border-t border-[#E1E7EF] dark:border-white w-full flex justify-between items-center'>
                                            <div className='hidden sm:block'></div>
                                            <div className='flex items-center gap-2.5'>
                                                {
                                                    new Date(event.event_date) < new Date() ? (
                                                        <button className='px-4 py-2 rounded-lg bg-red-600 text-white font-medium cursor-not-allowed w-full'>Expired</button>
                                                    ) : (
                                                        <>
                                                            <Link to={`/manage-events-update/${event._id}`} className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-[#141414] font-medium bg-gray-100  transition'><FaRegEdit size={16} /><span>Update</span></Link>
                                                            <button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F43198] text-white font-medium transition'><RiDeleteBinLine size={16} /><span>Delete</span></button>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageEvents;