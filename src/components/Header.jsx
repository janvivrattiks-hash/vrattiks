import React, { useState } from 'react'
import logo from '../assests/img/logo/logo.png'
import { IoMenu } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io';
import IntroductionSpeech from './IntroductionSpeech';

export default function Header() {
    // modal open
    const [open, setOpen] = useState(false);

    const [menu, setMenu] = useState(false);
    const websiteIntroText = "Hello and welcome to our website! We offer the best services for your needs.";


    return (
        <div>
            {/* <IntroductionSpeech text={websiteIntroText} /> */}

            <header className='py-2 fixed top-0 left-0 w-full bg-black z-10'>
                <div className='container mx-auto lg:px-20 px-7'>
                    <div className='flex items-center py-3 justify-between'>
                        <a className='logo' href='/'>
                            <img src={logo} className='w-[26%]' alt='vrattiks logo' />
                        </a>

                        {/*desktop view*/}
                        <nav className='hidden md:block'>
                            <ul className='md:flex md:items-center md:flex-row flex-col text-left'>
                                <li className='mb-5 md:mb-0'>
                                    <Link to={'/'} className='text-white px-3'>Home</Link>
                                </li>
                                <li className='mb-5 md:mb-0'>
                                    <Link to={'/about'} className='text-white px-3'>Company</Link>
                                </li>
                                <li className='mb-5 md:mb-0'>
                                    <Link to={'/contact'} className='text-white px-3'>Contact</Link>
                                </li>
                                <li className='mb-5 md:mb-0'>
                                    <button onClick={() => setOpen(true)} className='bg-[#7f36ec] text-white p-3 py-2 rounded-md font-medium text-sm w-full'>
                                        Book a Free Call</button>
                                </li>
                            </ul>
                        </nav>
                        <IoMenu className='md:hidden text-3xl block text-white' onClick={() => setMenu(!menu)} />

                        {/*mobile view*/}
                        <div className={`${menu ? 'block' : 'hidden'}`}>
                            <nav className="pt-8 bg-black flex items-center fixed top-16 w-full left-0 px-4
                                 ">
                                <ul className='md:flex md:items-center md:flex-row flex-col text-left w-full'>
                                    <li className='mb-5 md:mb-0'>
                                        <Link to={'/'} className='text-white px-3'>Home</Link>
                                    </li>
                                    <li className='mb-5 md:mb-0'>
                                        <Link to={'/about'} className='text-white px-3'>Company</Link>
                                    </li>
                                    <li className='mb-5 md:mb-0'>
                                        <Link to={'/contact'} className='text-white px-3'>Contact</Link>
                                    </li>
                                    <li className='mb-5 md:mb-0'>
                                        <button className='bg-[#7f36ec] text-white p-3 py-2 rounded-md font-medium text-sm w-full'>
                                            Book a Free Call</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>


                    </div>
                </div>
            </header>


            {open && (
                <div onClick={() => setOpen(false)} className='fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0'>
                    <div onClick={(e) => e.stopPropagation()} className='bg-[#070a13] p-5 relative'>
                        <div className='text-center text-white mb-4'>
                            <h2 className='text-2xl font-semibold mb-3'>Book a Free Call</h2>
                            <p>Fill in your details and we'll get back to you shortly</p>
                        </div>

                        <form>
                            <label className='block text-sm font-sf font-medium text-foreground mb-2 text-white'>Name</label>
                            <input type="text" placeholder='Enter Your Name' className='mb-6 w-full bg-[#070a13] p-3 rounded-md border border-gray-800 
                    focus:border-[#b79af3]' name='name' />
                            <label className='block text-sm font-sf font-medium text-foreground mb-2 text-white'>Mobile Number</label>
                            <input type="email" placeholder='Enter Your Mobile Number' className='mb-6 w-full bg-[#070a13] p-3 rounded-md border border-gray-800 
                    focus:border-[#b79af3]' name='email' />

                            <div className='flex gap-3 mt-4'>
                                <button onClick={() => setOpen(false)} className="hover:bg-[#1d2839] text-center py-2 px-4 border border-white/20 text-white rounded-md font-urbanist w-full">
                                    Cancel</button>
                                <button className="text-center py-2 px-4 bg-[#5e48e8] text-white rounded-md font-urbanist w-full">
                                    Submit Request</button>
                            </div>
                        </form>

                        <div className='absolute top-2 right-2 cursor-pointer'>
                            <IoMdClose className='text-white' onClick={() => setOpen(false)} size={30} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
