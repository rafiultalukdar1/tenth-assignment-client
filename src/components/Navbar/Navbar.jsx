import React, { use, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaRegCalendar } from 'react-icons/fa';

const Navbar = () => {

    const {user, logOut} = use(AuthContext);
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Log Out
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('You logged out successfully!');
            })
            .catch(error => {
                toast.error(error.message);
            })
    };

    // Dark mood
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };


    const links = <>
        <NavLink to='/create-event'>Create Event</NavLink>
        <NavLink to='/manage-events'>Manage Events</NavLink>
        <NavLink to='/joined-events'>Joined Events</NavLink>
    </>

    return (
        <>
            <div className='bg-[#F8F8F8] dark:bg-gray-900 shadow-sm dark:shadow-md py-2.5 sticky top-0 z-99'>
                <div className='navbar container'>
                    <div className='navbar-start'>
                        <div className='dropdown'>
                            <div tabIndex={0} role='button' className='lg:hidden cursor-pointer mr-2'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-10' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
                            </svg>
                            </div>
                            <nav tabIndex='-1' className='menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow px-5 py-3 space-y-1.5'>
                                <NavLink to='/'>Home</NavLink>
                                <NavLink to='/upcoming-events'>Upcoming Events</NavLink>
                            </nav>
                        </div>
                        <NavLink to='/' className='flex items-center gap-1.5 text-[20px] sm:text-[22px] font-bold text-[#219E64]'><FaRegCalendar /><span>EventSphere</span></NavLink>
                    </div>
                    <div className='navbar-end gap-6'>
                        <div className='navbar-center hidden lg:flex'>
                            <nav className='flex items-center gap-[22px]'>
                                <NavLink to='/'>Home</NavLink>
                                <NavLink to='/upcoming-events'>Upcoming Events</NavLink>
                            </nav>
                        </div>
                        <div>
                            <input onChange={(e) => handleTheme(e.target.checked)} type="checkbox" defaultChecked={localStorage.getItem('theme') === "dark"} className="toggle"/>
                        </div>
                        {
                            user ? (
                                <>
                                    <div className='relative'>
                                        <div>
                                            <img onClick={() => setOpen(!open)} src={user.photoURL}  className='w-11 h-11 object-cover rounded-full cursor-pointer'/>
                                        </div>
                                        {
                                            open ? (
                                            <div className='absolute menu bg-base-100 right-0 w-[235px] px-[15px] py-[22px] rounded-lg shadow-xl space-y-5'>
                                                <div onClick={() => setOpen(false)} className='dropdown-link flex flex-col gap-3 text-[18px] font-semibold'>{links}</div>
                                                <button onClick={() => { handleLogOut(); setOpen(false); }} className='py-1.5 bg-[#219E64] text-white text-[16px] font-medium rounded-lg w-full'>LogOut</button>
                                            </div>
                                            ) : ('')
                                        }
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='login-nav flex items-center gap-2'>
                                        <NavLink to='/login' className='py-1.5 px-5 bg-white rounded-lg text-[#219E64] border border-[#219E64] text-[18px] font-semibold'>Login</NavLink>
                                        <NavLink to='/register' className='py-1.5 px-5 bg-white rounded-lg text-[#219E64] border border-[#219E64] text-[18px] font-semibold hidden sm:block'>Register</NavLink>
                                    </div>
                                </>)
                            }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;