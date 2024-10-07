import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h2 className="text-5xl font-bold mb-4">Lycentric</h2>
            <p className="text-gray-400 text-2xl mb-4">
              Lycentric is a leading ecommerce platform offering the best shopping experience with a variety of fashion, electronics, and home goods.
            </p>
            <p className="text-gray-400 text-lg">
              Address: 1234 Market St, San Francisco, CA 94103
            </p>
            <p className="text-gray-400 text-lg">Email: support@yourbrand.com</p>
            <p className="text-gray-400 text-lg">Phone: +1 800-123-4567</p>
          </div>

          {/* Useful Links */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">Useful Links</h2>
            <ul>
              <li className="mb-2">
                <a href="/about" className="hover:text-gray-300 text-2xl">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/services" className="hover:text-gray-300 text-2xl">Services</a>
              </li>
              <li className="mb-2">
                <a href="/products" className="hover:text-gray-300 text-2xl">Products</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-gray-300 text-2xl">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="hover:text-gray-300 text-2xl">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social Media */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-4 text-lg">Sign up for our newsletter and get the latest updates on new arrivals, exclusive deals, and more.</p>
            
            <form className="mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-4 bg-gray-700 text-gray-200 rounded focus:outline-none"
              />
              <button className="w-full mt-2 p-4 bg-blue-600 hover:bg-blue-700 rounded">Subscribe</button>
            </form>

            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Your Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
