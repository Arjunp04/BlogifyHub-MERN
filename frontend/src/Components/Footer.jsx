import React from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {

     const currentYear = new Date().getFullYear();

    return (
      <>
        <div className="mt-8 w-full bg-[#0b05b4] border-2 border-blue-900 flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 rounded-t-3xl px-5 md:px-10 lg:px-20 md:space-x-10">
          <div className="flex flex-col text-white">
            <h3 className="font-semibold text-xl mb-2">About Us</h3>
            <p className='text-base md:max-w-[500px]'>
              BlogifyHub is a platform to explore and share insightful articles
              on technology, lifestyle, and creativity. <br />
              Join our community of like-minded individuals today! <br />
              Our mission is to empower voices around the world to express their
              ideas and foster meaningful discussions.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col text-white space-y-2">
            <h3 className="font-semibold text-xl mb-2">Quick Links</h3>
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </a>
          </div>

          <div className="flex flex-col text-white">
            <h3 className="font-semibold text-xl mb-3 md:ml-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-300"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-sky-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-pink-600"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <p className="py-2 pb-6 text-center text-white bg-[#0b05b4] text-sm">
          All <b>©</b> rights reserved @
          <strong>BlogifyHub {currentYear}</strong>
        </p>
      </>
    );
}

export default Footer
