import React from 'react';
import bannerImg from '../../assets/images/banner-img.jpg';
import { FaArrowRightLong } from 'react-icons/fa6';

const Banner = () => {
    return (
        <>
            <div className='py-[130px] sm:py-[150px] md:py-[170px] lg:py-[200px] bg-cover bg-center bg-no-repeat' style={{backgroundImage: `linear-gradient(to bottom, rgba(28,122,80,0.95), rgba(33,158,100,0.85)), url(${bannerImg})`}}>
                <div className='container'>
                    <h2 className='text-center text-[32px] sm:text-[42px] md:text-[48px] lg:text-[65px] text-white font-extrabold leading-[1.2]'>Make a Difference in <br /> Your Community</h2>
                    <p className='text-center text-white text-[18px] sm:text-[20px] md:text-[22px] mt-4'>Join hands with EventSphere to create meaningful events that<br className='hidden sm:block' /> bring people together and inspire positive change.</p>
                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mt-10'>
                        <button className='bg-[#2694c0] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-[#1b83ac] transition justify-center'><span>Explore Events</span><FaArrowRightLong /></button>
                        <button className='border border-white text-white bg-[#ffffff2f] px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-[#219E64] transition'>Create Event</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;