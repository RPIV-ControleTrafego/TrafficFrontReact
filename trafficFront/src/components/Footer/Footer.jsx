import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
    className="bg-blue-500 rounded-lg shadow dark:bg-gray-900  mt-96 "
    style={{
      display: 'flex',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0, 
      justifyContent: 'space-between',
     width: 1730,
     marginTop:"200vh"
    }}
  >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 left-0  ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0">
            <img
              src="https://www.svgrepo.com/show/139/traffic-light.svg"
              className="h-8 mr-3"
              alt="Traffic Light"
            />
             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <span className="text-green-500">Traffic</span>
            <span className="text-yellow-500">Today</span>{" "}
            <span className="text-red-500">System</span>{" "}
          </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 ">

          <li>
              <NavLink
                to="/stats"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  mr-6"
                activeClassName="bg-blue-700" 
              >
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Infraction"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mr-6"
                activeClassName="bg-blue-700"
              >
                Infraction
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Accidents"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent mr-6"
                activeClassName="bg-blue-700" 
              >
                Accidents
              </NavLink>
            </li>

            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center dark:text-gray-400">
  © 2023 <a href="https://flowbite.com/" className="hover:underline text-white">Traffic Today System™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
