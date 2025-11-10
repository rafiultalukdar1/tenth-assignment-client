import { CiShoppingTag } from 'react-icons/ci';
import { FaArrowLeft, FaMapMarkerAlt, FaRegCalendar } from 'react-icons/fa';
import { Link, useParams } from 'react-router';
import useAuth from '../../context/useAuth';
import useAxiosSecure from '../../context/useAxiosSecure';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const EventDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [event, setEvent] = useState({});
    const [joinedEvents, setJoinedEvents] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            const res = await axiosSecure.get(`/events/${id}`);
            setEvent(res.data);
        };
        fetchEvent();
    }, [id, axiosSecure]);

    const handleJoinEvent = async () => {
        if (!user) return toast.error('Please login to join this event');

        const res = await axiosSecure.post('/join-event', { eventId: id, userEmail: user.email })
            .catch(err => {
                if (err.response?.status === 400) {
                    toast.warning('You have already joined this event');
                } else {
                    toast.error('Something went wrong');
                }
                return null;
            });
        if (!res) return;
        const joinedRes = await axiosSecure.get(`/joined-events/${user.email}`)
            .catch(err => console.error(err));
        if (joinedRes?.data) setJoinedEvents(joinedRes.data);
        toast.success('Successfully joined the event!');
    };

    useEffect(() => {
        if (!user) return;
        const fetchJoinedEvents = async () => {
            const res = await axiosSecure.get(`/joined-events/${user.email}`);
            setJoinedEvents(res.data);
        };
        fetchJoinedEvents();
    }, [user, axiosSecure]);
    

    const { thumbnail, event_type, title, description, event_details, event_date, location, organizer_photo, organizer_name, organizer_email } = event;

    return (
        <>
            <div className='py-[50px] md:py-[70px]'>
                <div className='container'>
                    <div className='max-w-[890px] mx-auto'>
                        <Link to='/upcoming-events' className='flex items-center gap-1.5 text-[16px] font-medium text-[#65758B] dark:text-white'>
                            <FaArrowLeft /><span>Back to Events</span>
                        </Link>
                        <img className='h-[310px] sm:h-[390px] md:h-[470px] w-full object-cover rounded-lg md:rounded-2xl mt-5 md:mt-[35px] shadow-sm dark:shadow-white' src={thumbnail} alt='' />
                        <p className='inline-flex items-center gap-1.5 py-1.5 px-4 bg-[#E7F8F2] text-[15px] text-[#10B77F] font-medium rounded-full mt-5'>
                            <CiShoppingTag /><span>{event_type}</span>
                        </p>
                        <h2 className='text-[#141414] dark:text-white text-[24px] sm:text-[28px] md:text-[36px] font-bold mt-5'>{title}</h2>
                        <p className='text-[#65758B] dark:text-[#9fb8df] text-[15px] pt-4 pb-7'>{description}</p>
                        <div className='grid grid-cols-12 gap-5 items-start'>
                            <div className='p-3 sm:p-5 border border-[#E1E7EF] dark:border-white rounded-2xl col-span-12 lg:col-span-7'>
                                <h4 className='text-[#141414] dark:text-white text-[20px] sm:text-[22px] font-semibold'>Event Details</h4>
                                <p className='text-[#65758B] dark:text-[#9fb8df] text-[15px] border-b pt-1.5 pb-3'>{event_details}</p>
                                <div className='grid grid-cols-1 sm:grid-cols-2 mt-4 gap-2.5'>
                                    <div className='flex items-center gap-2.5'>
                                        <div className='bg-[#E9F7EF] w-10 h-10 rounded-full flex items-center justify-center'><FaRegCalendar className='text-[#219E64] text-[18px]'/></div>
                                        <h4 className='text-[18px] text-[#141414] dark:text-white font-semibold'>{new Date(event_date).toLocaleDateString('en-CA')}</h4>
                                    </div>
                                    <div className='flex items-center gap-2.5'>
                                        <div className='bg-[#E9F7EF] w-10 h-10 rounded-full flex items-center justify-center'><FaMapMarkerAlt className='text-[#219E64] text-[18px]'/></div>
                                        <h4 className='text-[18px] text-[#141414] dark:text-white font-semibold'>{location}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-12 lg:col-span-5'>
                                <div className='p-3 sm:p-5 border border-[#E1E7EF] dark:border-white rounded-2xl'>
                                    <h4 className='text-[#141414] dark:text-white text-[18px] md:text-[20px] font-semibold'>Organized By</h4>
                                    <div className='flex gap-2.5 mt-3'>
                                        <div>
                                            <img className='h-12 w-12 rounded-full object-cover' src={organizer_photo} alt='' />
                                        </div>
                                        <div>
                                            <h4 className='text-[#141414] dark:text-white text-[18px] font-semibold'>{organizer_name}</h4>
                                            <p className='text-[15px]'>{organizer_email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 sm:p-5 border border-[#E1E7EF] dark:border-white rounded-2xl mt-4'>
                                    <h4 className='text-[#141414] dark:text-white text-[18px] md:text-[20px] font-semibold'>Join This Event</h4>
                                    <button onClick={handleJoinEvent} className='py-1.5 w-full bg-[#219E64] rounded mt-4 mb-3 text-white text-[17px] font-medium text-center'>Join Event</button>
                                    <p className='text-[14px] text-[#65758B] dark:text-[#9fb8df]'>By joining, you'll receive event updates and reminders</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetails;
