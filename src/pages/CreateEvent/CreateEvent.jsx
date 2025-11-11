import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../context/useAuth';

const CreateEvent = () => {

    const { user } = useAuth();
    const [eventDate, setEventDate] = useState(null);
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/events')
        .then(res => {
            const uniqueTypes = [...new Set(res.data.map(event => event.event_type))];
            setEventTypes(uniqueTypes);
        })
        .catch(err => console.error(err));
    }, []);

    const handleCreateEvent = (e) => {
        e.preventDefault();
        const thumbnail = e.target.thumbnail.value;
        const event_type = e.target.event_type.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const event_details = e.target.event_details.value;
        const event_date = eventDate ? eventDate.toISOString() : null;
        const location = e.target.location.value;
        const organizer_photo = user?.photoURL || '';
        const organizer_name = user?.displayName || 'Unknown User';
        const organizer_email = user?.email || 'No Email';
        const status = 'upcoming';
        const created_at = new Date().toISOString();

        if (!title || !description || !event_details || !thumbnail || !event_type || !location || !eventDate) {
            return Swal.fire({
                icon: 'error',
                title: 'All fields are required!',
                text: 'Please fill out every field and select a valid future date.',
            });
        }

        if (eventDate <= new Date()) {
            return Swal.fire({
                icon: 'error',
                title: 'Invalid Date!',
                text: 'Please select a valid future date for the event.',
            });
        }

        const newEvent = { thumbnail, event_type, title, description, event_details, event_date, location, organizer_photo, organizer_name, organizer_email, status, created_at };

        axios.post('http://localhost:3000/events', newEvent)
        .then(res => {
            if (res.data.acknowledged) {
            Swal.fire({
                icon: 'success',
                title: 'Event created successfully!',
                timer: 1200,
                showConfirmButton: false,
                willClose: () => {
                    window.location.href = '/upcoming-events';
                }
            });
            } else {
            Swal.fire('Error', 'Failed to create event!', 'error');
            }
        })
        .catch(() => {
            Swal.fire('Error', 'Failed to create event!', 'error');
        });
    };


    return (
        <>
            <div className='py-[50px] md:py-[70px]'>
                <div className='container'>
                    <h2 className='text-center text-[32px] sm:text-[40px] lg:text-[50px] font-bold'>Create New <span className='bg-linear-to-b from-[#219E64] to-[#5FD68E] bg-clip-text text-transparent'>Event</span></h2>
                    <p className='text-center text-[16px] md:text-[18px] font-medium text-[#6D7873]'>Organize a social development event and bring your community together</p>
                    <div className='max-w-[750px] mx-auto py-7 px-5 border border-[#CCCCCC] dark:bg-gray-900 rounded-2xl mt-5 lg:mt-8'>
                        <form onSubmit={handleCreateEvent} className='space-y-3'>
                            <input type='text' name='title' placeholder='Event Title'  className='form-input' />
                            <textarea name='description' placeholder='Short Description'  className='form-input h-24'></textarea>
                            <textarea name='event_details' placeholder='Event Details'  className='form-input h-28'></textarea>
                            <input type='text' name='thumbnail' placeholder='Thumbnail Image URL'  className='form-input' />
                            <select name='event_type'  className='form-input'>
                                <option value=''>Select Event Type</option>
                                {eventTypes.map((type, i) => (
                                    <option key={i} value={type}>{type}</option>
                                ))}
                            </select>
                            <input type='text' name='location' placeholder='Event Location'  className='form-input' />
                            <div className='flex flex-col'>
                                <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} minDate={new Date()} showTimeSelect  dateFormat='Pp' placeholderText='Choose Event Date' className='form-input' />
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div>
                                    <input type='text' name='organizer_name' value={user?.displayName || ''} readOnly className='form-input bg-gray-100' />
                                </div>
                                <div>
                                    <input type='email' name='organizer_email' value={user?.email || ''}  readOnly  className='form-input bg-gray-100' />
                                </div>
                            </div>
                            <input type='text' name='organizer_photo' value={user?.photoURL || ''} readOnly hidden />
                            <button type='submit' className='w-full bg-[#219E64] hover:bg-[#1b7f52] text-white font-semibold py-2.5 rounded-lg transition'>Create Event</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateEvent;