import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar, Avatar } from 'flowbite-react';

import Logo from '../assets/logo.png';

const BACKEND_IP = process.env.REACT_APP_BACKEND_IP || '127.0.0.1';

const NavBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await axios.get(`http://${BACKEND_IP}:5000/get-username`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      setUsername(response.data.username);
    };

    fetchUsername();
  }, []);

  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="/dashboard">
        <img
          src={Logo}
          className="mr-3 h-6 sm:h-9"
          alt="GreetMate Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">GreetMate</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <div className="flex flex-col items-center sm:items-start">
          <Link
            to="/"
            className="hover:underline flex items-center"
          >
            Logout
          </Link>
          <Link
            to="/dashboard"
            className="hover:underline flex items-center"
          >
            Dashboard
          </Link>
        </div>
        <span className="border-r-2  border-gray-300 dark:border-gray-700 mx-3" />
        <Avatar
          rounded
          className="underline"
        >
          <div className="space-y-1 font-medium dark:text-white">
            <Link
              to="/settings"
              className="hover:underline flex items-center"
            >
              {username}
            </Link>
          </div>
        </Avatar>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
