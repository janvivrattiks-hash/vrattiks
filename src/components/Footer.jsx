import React from 'react'
import logo from '../assests/img/logo/logo.png'
import { FiLinkedin, FiTwitter } from 'react-icons/fi'
import { SlSocialFacebook } from 'react-icons/sl'

export default function Footer() {
  return (
    <footer className='py-16 text-white'>
      <div className='container mx-auto lg:px-20 px-7'>
        <div className='md:grid grid-cols-3 gap-12'>
            <div className='md:text-left text-center mb-6 md:mb-0'>
            <div className='flex justify-center md:justify-start'>
                <img src={logo} className='w-[26%] mb-6' alt='vrattiks logo' />
            </div>
            <p className='max-w-md mb-4'>At Vrattiks, we believe intelligence is the
              foundation of unstoppable growth — using AI to build a smarter, more efficient future together.</p>
            <button className='text-left bg-[#070a13] border-white border rounded-md text-white px-3 py-1 font-urbanist text-sm'>
              Talk to AI Expert</button>

          </div>
          <div className=' mb-7 md:mb-0 text-center'>
            <h4 className='text-white text-xl mb-2 md:mb-4'>Company</h4>
            <ul>
              <li className='mb-2 md:mb-5'><a href='/about'>About Us</a></li>
              <li><a href='/privacy-policy'>Privacy Policy</a></li>
            </ul>
          </div>
          <div className=' mb-7 md:mb-0 text-center'>
            <h4 className='text-white text-xl  mb-2 md:mb-4'>Contact</h4>
             <ul>
              <li className='mb-2 md:mb-5'><b>Phone :</b> <a href='tel:+919106836019'>+91 9106836019</a></li>
              <li className='mb-2 md:mb-5'><b>Email :</b> <a href='mailto:vrattiks@gmail.com'>vrattiks@gmail.com</a></li>
            </ul>
            <div className='mt-7 md:mt-0'>
              <div className='flex justify-center'>
                <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer' className='mx-3 text-lg'><SlSocialFacebook/></a>
                <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer' className='mx-3 text-lg'><FiTwitter/></a>
                <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer' className='mx-3 text-lg'><FiLinkedin/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center pt-0 md:pt-16'>
        <p>© 2025 Vrattiks. All rights reserved.</p>
      </div>
    </footer>
  )
}
