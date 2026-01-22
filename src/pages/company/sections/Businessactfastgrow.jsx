import React, { useState } from 'react'
import businessactfastgrow from '../../../assests/img/feature/businesses-that-act-fast-grow-faster.webp'
import { IoMdClose } from 'react-icons/io'

export default function Businessactfastgrow() {
    // modal open
    const [open, setOpen] = useState(false);

    return (
        <>
            <section className='bg-[#121118] md:py-20 py-10'>
                <div className='container lg:px-32 xl:px-48 px-6 m-auto'>
                    <div className='grid md:grid-cols-2 items-center gap-12 text-white'>
                        <div className=''>
                            <img src={businessactfastgrow} alt="" className='rounded-3xl w-full max-w-md shadow-[0_0_40px_rgba(0,191,255,0.4)]' />
                        </div>
                        <div className=''>
                            <h2 className='font-urbanist lg:text-5xl text-4xl mb-12'>
                                <span className='text-[#b79af3]'>Businesses</span> that act <span className='text-[#b79af3]'>
                                    fast grow faster.</span> Will yours?</h2>
                            <p className='text-base mb-6'>Every successful brand starts with the right strategy. Let's discuss how we can take your
                                business to the next level.</p>
                            <button onClick={() => setOpen(true)} className='text-left bg-[#7f36ec] text-white px-4 py-2 rounded-md font-urbanist'>
                                Book a Free Call Now</button>
                        </div>
                    </div>
                </div>
            </section>
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
        </>
    )
}
