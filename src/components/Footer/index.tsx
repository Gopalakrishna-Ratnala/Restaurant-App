import { FaSquarePinterest } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaFacebookSquare } from 'react-icons/fa'
import FooterLogo from '../../assets/FooterLogo.jpg'

import './index.css'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-logo-heading-container'>
        <img src={FooterLogo} alt='footerlogo' className='footer-image' />
        <p className='footer-heading'>Tasty Kitchens</p>
      </div>
      <p className='footer-msg'>The only thing we are serious about is food.</p>
      <p className='footer-msg'>Contact us on</p>
      <div>
        <a
          href='https://in.pinterest.com/swiggyindia/'
          target='_blank'
          rel='noreferrer'
        >
          <FaSquarePinterest className='footer-icons' />
        </a>
        <a
          href='https://www.instagram.com/swiggyindia/'
          target='_blank'
          rel='noreferrer'
        >
          <FaInstagram className='footer-icons' />
        </a>
        <a
          href='https://x.com/Swiggy?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
          target='_blank'
          rel='noreferrer'
        >
          <FaTwitter className='footer-icons' />
        </a>
        <a
          href='https://www.facebook.com/swiggy.in/'
          target='_blank'
          rel='noreferrer'
        >
          <FaFacebookSquare className='footer-icons' />
        </a>
      </div>
    </div>
  )
}

export default Footer
