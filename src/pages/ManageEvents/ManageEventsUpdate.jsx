import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../context/useAuth';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';

const ManageEventsUpdate = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [eventDate, setEventDate] = useState(null);

    const eventTypes = ['Cleanup', 'Plantation', 'Donation'];

    useEffect(() => {
        if (!user) return;
        fetch(`http://localhost:3000/events/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Event not found');
                return res.json();
            })
            .then(data => {
                setEvent(data);
                setEventDate(new Date(data.event_date));
            })
            .catch(err => {
                console.error(err);
                navigate('/manage-events');
            });
    }, [user, id, navigate]);

    // Update
    const handleUpdateEvent = (e) => {
        e.preventDefault();

        const title = e.target.title.value.trim();
        const description = e.target.description.value.trim();
        const event_details = e.target.event_details.value.trim();
        const thumbnail = e.target.thumbnail.value.trim();
        const event_type = e.target.event_type.value.trim();
        const location = e.target.location.value.trim();
        if (!title || !description || !event_details || !thumbnail || !event_type || !location || !eventDate) {
            return Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'All fields are required!',
            });
        }
        const updatedEvent = {
            title,
            description,
            event_details,
            thumbnail,
            event_type,
            location,
            event_date: eventDate,
            organizer_name: user?.displayName,
            organizer_email: user?.email,
            organizer_photo: user?.photoURL
        };
        fetch(`http://localhost:3000/events/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEvent)
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to update event');
            return res.json();
        })
        .then(data => {
            console.log('Event updated:', data);
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Event updated successfully!',
                timer: 2000,
                showConfirmButton: false
            });
            navigate(`/manage-events`);
        })
        .catch(err => {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Try again.'
            });
        });
    };

    if (!event) return <Loading></Loading>;

    const handleCancel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Your changes will not be saved!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#219E64',
            cancelButtonColor: '#F43198',
            confirmButtonText: 'Yes, cancel',
            cancelButtonText: 'No, stay'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/manage-events');
            }
        });
    };

    return (
        <div className='py-[50px] md:py-[70px]'>
            <div className='container'>
                <h2 className='text-center text-[32px] sm:text-[40px] lg:text-[50px] font-bold'>
                    Update <span className='bg-linear-to-b from-[#219E64] to-[#5FD68E] bg-clip-text text-transparent'>Event</span>
                </h2>

                <div className='max-w-[750px] mx-auto py-7 px-5 border border-[#CCCCCC] dark:bg-gray-900 rounded-2xl mt-5 lg:mt-8'>
                    <form onSubmit={handleUpdateEvent} className='space-y-3'>
                        <input type='text' name='title' placeholder='Event Title' className='form-input' defaultValue={event?.title} />
                        <textarea name='description' placeholder='Short Description' className='form-input h-24' defaultValue={event?.description}></textarea>
                        <textarea name='event_details' placeholder='Event Details' className='form-input h-28' defaultValue={event?.event_details}></textarea>
                        <input type='text' name='thumbnail' placeholder='Thumbnail Image URL' className='form-input' defaultValue={event?.thumbnail} />
                        <select name='event_type' className='form-input' defaultValue={event?.event_type}>
                            <option value=''>Select Event Type</option>
                            {eventTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                        <input type='text' name='location' placeholder='Event Location' className='form-input' defaultValue={event?.location} />
                        <div className='flex flex-col'>
                            <DatePicker 
                                selected={eventDate} 
                                onChange={(date) => setEventDate(date)} 
                                minDate={new Date()}
                                timeIntervals={2}
                                showTimeSelect 
                                dateFormat='Pp' 
                                placeholderText='Choose Event Date' 
                                className='form-input' 
                            />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <input type='text' name='organizer_name' value={user?.displayName || ''} readOnly className='form-input bg-gray-100' />
                            <input type='email' name='organizer_email' value={user?.email || ''} readOnly className='form-input bg-gray-100' />
                        </div>
                        <input type='text' name='organizer_photo' value={user?.photoURL || ''} readOnly hidden />
                        <div className='flex gap-4 mt-3'>
                            <button type='submit' className='flex-1 bg-[#219E64] text-white font-semibold py-2.5 rounded-md'>Update Event</button>
                            <button type='button' onClick={handleCancel} className='flex-1 bg-[#F43198] text-white font-semibold py-2.5 rounded-md'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageEventsUpdate;