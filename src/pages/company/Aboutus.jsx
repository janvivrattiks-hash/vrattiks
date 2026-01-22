import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import whoweare from '../../assests/img/feature/who-we-are.webp'
import Culturevalues from './sections/Culturevalues'
import Visionmission from './sections/Visionmission'
import Businessactfastgrow from './sections/Businessactfastgrow'
import { IoMdClose } from 'react-icons/io'

export default function About_us() {
    // modal open
    const [open, setOpen] = useState(false);


    return (
        <div>
            {/*header part*/}
            <Header />

            <div className='bg-[#121118] xl:py-32 py-20 md:py-24'>
                <section className='container md:px-20 px-7 m-auto'>
                    <div className='grid lg:grid-cols-2 gap-12 lg:items-center text-start'>
                        <div className=''>
                            <h2 className='text-white md:text-5xl text-4xl font-bold lg:text-left mb-5 max-w-3xl font-urbanist'>
                                Who We Are?</h2>

                            <p className='text-white text-base mb-5 max-w-lg'>
                                Vrattiks was born from the ancient Indian idea of "Vritti" -
                                the natural flow of thought, action, and evolution. We combine this
                                timeless wisdom with the power of modern AI to create systems that
                                are not just automated, but intelligent, adaptive, and deeply aligned
                                with how businesses truly work. Inspired by the 5 Elements: Earth, Water,
                                Fire, Air, and Space - everything we build is designed to bring structure,
                                clarity, energy, connection, and limitless growth into your operations.
                                This is not just tech. It's intelligence, with purpose.
                            </p>
                            <button onClick={() => setOpen(true)} className='text-left bg-[#7f36ec] text-white px-4 py-2 rounded-md font-urbanist'>Let's Talk</button>
                        </div>
                        <div className=''>
                            <img src={whoweare} alt="" className='rounded-[3rem] max-w-full h-auto shadow-[0_0_40px_rgba(0,191,255,0.5)]' />
                        </div>
                    </div>
                </section>


                {/*Culture & Values part */}
                <Culturevalues />


            </div>

            {/*Vision Mission Part */}
            <Visionmission />


            {/*Business act fast grow part*/}
            <Businessactfastgrow />

            {/*footer part*/}
            <Footer />


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
