import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../context/useAuth';

const Register = () => {

    const [showPass, setShowPass] = useState(false);
    const {signWithGoogle, createUser, updateUser} = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        createUser(email, password)
            .then(result => {
                e.target.reset();
                toast.success('Account created successfully!');
                updateUser(result.user,{ displayName: name, photoURL: photo })
                    .then(() => {
                        toast.success('Account created successfully!');
                        window.location.href = '/';
                    })
                    .catch((error) => {
                       toast.error(error.code  ? error.code.replace('auth/', '').replaceAll('-', ' ')  : error.message );
                    });
            })
            .catch(error => {
                toast.error(error.code  ? error.code.replace('auth/', '').replaceAll('-', ' ')  : error.message );
            });
    }

    // Google Sign In
    const handleGoogleSignIn = () => {
        signWithGoogle()
            .then(() => {
                toast.success("Login successful!");
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(error => {
                toast.error(error.code  ? error.code.replace('auth/', '').replaceAll('-', ' ')  : error.message );
            });
    }
    

    return (
        <div>
            <div className='py-[65px] lg:py-[95px]'>
                <div className='container'>
                    <div className='max-w-[510px] mx-auto px-[25px] py-7 md:py-10 md:px-10 bg-white dark:bg-gray-900 shadow-xl rounded-md border border-[#e7e7e798]'>
                        <h2 className='text-[#141414] dark:text-white text-center text-[24px] md:text-[28px] lg:text-[32px] font-semibold'>Register your account</h2>
                        <span className='block bg-[#E7E7E7] h-px w-full mt-[15px] mb-2.5 md:mt-5 md:mb-3'></span>
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* Name Field */}
                                <label className="form-label">Your Name</label>
                                <input name='name' className='form-input' type="text" placeholder="Enter your name"/>
                                {/* Photo URL */}
                                <label className="form-label">Photo URL</label>
                                <input name='photo' className='form-input' type="text" placeholder="Photo URL"/>
                                {/* Email Field */}
                                <label className="form-label">Email address</label>
                                <input name='email' className='form-input' type="email" placeholder="Enter your email address" required/>
                                {/* Password Field */}
                                <label className="form-label">Password</label>
                                <div className='relative'>
                                    <input name='password' className='form-input' type={showPass ? 'text' : 'password'} placeholder="Enter your password"/>
                                    <span onClick={() => setShowPass(!showPass)} className='absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer text-[#141414] dark:text-white'>{showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</span>
                                </div>
                                {/* Button */}
                                <button type="submit" className='py-2 w-full bg-[#219E64] rounded mt-5 text-white text-[18px] font-medium'>Register</button>
                            </fieldset>
                        </form>
                        <div className='divider my-[22px] text-[#141414] dark:text-white'>OR</div>
                        <button onClick={handleGoogleSignIn} className='google-button'><svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="transparent"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg><span>Sign up with Google</span></button>
                        <p className='text-center text-[#464545] text-[16px] font-medium pt-[22px]'>Already have an account? <Link className='text-[#219E64] font-semibold' to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;