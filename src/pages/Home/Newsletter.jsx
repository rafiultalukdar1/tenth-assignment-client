import React from 'react';

const Newsletter = () => {
    return (
        <>
            <div className='py-[60px] lg:py-[90px] bg-[#FDFDFD] dark:bg-[#1D232A]'>
                <div className='container'>
                    <h2 className='text-center text-[30px] sm:text-[38px] md:text-[45px] lg:text-[52px] font-bold text-[#141414] dark:text-white'><span>Stay Updated</span></h2>
                    <p className='text-center text-[16px] md:text-[18px] font-medium text-[#6D7873]'>Subscribe to our newsletter to get updates about new events and community initiatives</p>
                    <div className='max-w-[730px] mx-auto px-5 md:px-8 pb-8 pt-10 shadow-sm dark:shadow-white rounded-lg mt-5 lg:mt-[30px]'>
                        <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                            <input type="email" placeholder="Enter your email address" className="w-full sm:w-[350px] px-5 py-3 rounded-full  text-[#141414] dark:text-white text-[16px] border border-[#219e648f] focus:border-[#219E64] outline-0" required/>
                            <button type="submit" className="bg-[#219E64] text-white font-semibold px-8 py-3 rounded-full transition duration-300">Subscribe</button>
                        </form>
                            <p className='text-center text-[14px] text-[#71717A] mt-3'>We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Newsletter;