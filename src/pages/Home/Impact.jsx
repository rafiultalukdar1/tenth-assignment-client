import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaRegCalendar, FaUsers } from 'react-icons/fa';

const Impact = () => {

    const features = [
        {
            icon: <FaRegCalendar className="text-[#219E64] text-[28px]" />,
            title: 'Easy Event Creation',
            description: 'Create and manage social development events in minutes with our intuitive platform.',
        },
        {
            icon: <FaUsers className="text-[#219E64] text-[28px]" />,
            title: 'Community Driven',
            description: 'Connect with like-minded individuals and make a real impact in your community.',
        },
        {
            icon: <FaMapMarkerAlt className="text-[#219E64] text-[28px]" />,
            title: 'Local Focus',
            description: 'Find and participate in events happening right in your neighborhood.',
        },
        {
            icon: <FaCheckCircle className="text-[#219E64] text-[28px]" />,
            title: 'Track Your Impact',
            description: "Keep track of all the events you've joined and the difference you've made.",
        },
    ];

    return (
        <>
            <div className='py-[60px] lg:py-[90px] bg-[#FDFDFD] dark:bg-[#1D232A]'>
                <div className='container'>
                    <h2 className='text-center text-[30px] sm:text-[38px] md:text-[45px] lg:text-[52px] font-bold text-[#141414] dark:text-white'>Why Choose Social Impact?</h2>
                    <p className='text-center text-[16px] md:text-[18px] font-medium text-[#6D7873]'>Our platform makes it easy to organize and participate in meaningful community events</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-[30px] md:mt-[50px]">
                        {
                            features.map((feature, index) => ( <div key={index} className="bg-white dark:bg-[#1D232A] shadow-sm border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition">
                                <div className="flex justify-center items-center mb-4">
                                    <div className="bg-[#E9F7EF] w-14 h-14 rounded-full flex items-center justify-center"> {feature.icon} </div>
                                </div>
                                <h3 className="text-[18px] font-semibold text-[#141414] dark:text-white mb-1.5">{feature.title}</h3>
                                <p className="text-[16px] text-[#6D7873]">{feature.description}</p>
                            </div> ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Impact;