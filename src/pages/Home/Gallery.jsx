import React from 'react';
import img1 from '../../assets/images/gallery-img1.jpg';
import img2 from '../../assets/images/gallery-img2.jpg';
import img3 from '../../assets/images/gallery-img3.jpg';
import img4 from '../../assets/images/gallery-img4.jpg';
import img5 from '../../assets/images/gallery-img5.jpg';
import img6 from '../../assets/images/gallery-img6.jpg';

const Gallery = () => {

    const events = [
        { title: 'Street Cleanup Drive', img: img1 },
        { title: 'Tree Plantation', img: img2 },
        { title: 'Donation Drive', img: img3 },
        { title: 'Beach Cleanup Campaign', img: img4 },
        { title: 'Community Service', img: img5 },
        { title: 'Environmental Awareness', img: img6 },
    ];

    return (
        <>
            <div className='py-[60px] lg:py-[90px] dark:bg-gray-900'>
                <div className='container'>
                    <h2 className='text-center text-[30px] sm:text-[38px] md:text-[45px] lg:text-[52px] font-bold text-[#141414] dark:text-white'>Community in Action</h2>
                    <p className='text-center text-[16px] md:text-[18px] font-medium text-[#6D7873]'>See the amazing impact our community has made</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px] md:mt-[50px]'>
                        {events.map((event, index) => (
                            <div key={index} className='relative rounded-xl overflow-hidden group cursor-pointer shadow-sm dark:shadow-white hover:shadow-md transition' >
                                <img src={event.img} alt={event.title} className='w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-500' />
                                <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent'></div>
                                <h3 className='absolute bottom-4 left-4 text-white text-[18px] font-medium'>{event.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Gallery;