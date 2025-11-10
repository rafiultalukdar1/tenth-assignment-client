import React, { use } from 'react';
import { CiShoppingTag } from 'react-icons/ci';
import { FaRegCalendar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router';

const UpEventCard = ({upEventPromise}) => {

    const events = use(upEventPromise);

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    events.map(event => (<div key={event._id} className='shadow-sm dark:shadow-md rounded-lg bg-white dark:bg-gray-800'>
                        <img src={event.thumbnail} className='h-[255px] w-full object-cover rounded-t-lg' alt="" />
                        <div className='pt-3 px-4 pb-4'>
                            <p className='inline-flex items-center gap-1 py-0.5 px-2 bg-[#E7F8F2] text-[12px] text-[#10B77F] font-medium rounded-full'><CiShoppingTag /><span>{event.event_type}</span></p>
                            <h2 className='pt-2 text-[20px] font-semibold'>{event.title}</h2>
                            <p className='text-[#6D7873] text-[15px] py-1 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>{event.description}</p>
                            <h6 className='mt-2 flex items-center gap-1.5 text-[15px] font-medium'><FaRegCalendar className='text-[16px] text-[#10B77F]'/><span>{event.event_date}</span></h6>
                            <h6 className='mt-2 flex items-center gap-1.5 text-[15px] font-medium'><FaLocationDot className='text-[16px] text-[#10B77F]'/><span>{event.location}</span></h6>
                            <Link to={`/event-details/${event._id}`} className='py-1.5 w-full bg-[#219E64] rounded mt-5 text-white text-[17px] font-medium block text-center'>View Event</Link>
                        </div>
                    </div>))
                }
            </div>
        </>
    );
};

export default UpEventCard;