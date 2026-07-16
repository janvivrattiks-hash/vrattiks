import React from 'react'
import logo from '../assests/img/logo/logo.png'
import { FiLinkedin, FiTwitter } from 'react-icons/fi'
import { SlSocialFacebook } from 'react-icons/sl'
import { SiClaude, SiGooglegemini, SiOpenai } from 'react-icons/si'
import AskChatGPTButton from './AskChatGPTButton'

export default function Footer() {
  return (
    <footer className='py-16 text-white'>
      <div className='container mx-auto lg:px-20 px-7'>
        <div className='md:grid grid-cols-3 gap-12 flex flex-col'>
            <div className='md:text-left text-center mb-6 md:mb-0'>
            <div className='flex justify-center md:justify-start'>
                <img src={logo} className='w-[26%] mb-6' alt='vrattiks logo' />
            </div>
            <p className='max-w-md mb-4'>At Vrattiks, we believe intelligence is the
              foundation of unstoppable growth — using AI to build a smarter, more efficient future together.</p>
            <section className='mt-8 max-w-md text-left' aria-labelledby='ask-ai-about-title'>
              <h2 id='ask-ai-about-title' className='text-2xl font-semibold leading-tight'>
                Ask AI About<br />Vrattiks Intelligence
              </h2>
              <p className='mt-4 text-base leading-7 text-gray-400'>
                Vrattiks Intelligence uses AI to help businesses build smarter systems, streamline operations, and grow with clarity and purpose.
              </p>
              <div className='mt-7 flex items-center gap-2'>
                <AskChatGPTButton
                  businessName='Vrattiks Intelligence'
                  websiteUrl='https://www.vrattiks.io/'
                  buttonText={<SiOpenai className='text-[#10A37F]' aria-hidden='true' />}
                  wrapperClassName='!w-auto !max-w-none shrink-0'
                  buttonClassName='!inline-flex !h-14 !w-14 items-center justify-center !rounded-full !border-[#303030] !bg-transparent !p-0 hover:!bg-white/5 hover:shadow-white/10 [&_svg]:h-7 [&_svg]:w-7'
                />
                <AskChatGPTButton
                  businessName='Vrattiks Intelligence'
                  websiteUrl='https://www.vrattiks.io/'
                  provider='Claude'
                  buttonText={<SiClaude className='text-[#D97757]' aria-hidden='true' />}
                  wrapperClassName='!w-auto !max-w-none shrink-0'
                  buttonClassName='!inline-flex !h-14 !w-14 items-center justify-center !rounded-full !border-[#303030] !bg-transparent !p-0 hover:!bg-white/5 hover:shadow-white/10 [&_svg]:h-7 [&_svg]:w-7'
                />
                <AskChatGPTButton
                  businessName='Vrattiks Intelligence'
                  websiteUrl='https://www.vrattiks.io/'
                  provider='Gemini'
                  buttonText={<SiGooglegemini className='text-[#8AB4F8]' aria-hidden='true' />}
                  wrapperClassName='!w-auto !max-w-none shrink-0'
                  buttonClassName='!inline-flex !h-14 !w-14 items-center justify-center !rounded-full !border-[#303030] !bg-transparent !p-0 hover:!bg-white/5 hover:shadow-white/10 [&_svg]:h-7 [&_svg]:w-7'
                />
              </div>
            </section>

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
