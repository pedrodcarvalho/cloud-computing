import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';

import Logo from '../assets/logo.png';

const NavBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await axios.get('http://localhost:5000/get-username', {
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
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src={Logo}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">GreetMate</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link
          to="/"
          className="hover:underline flex items-center"
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          className="hover:underline flex items-center"
        >
          Dashboard
        </Link>
        <Avatar rounded className='border border-gray-300 dark:border-gray-700 rounded-md p-1'>
          <div className="space-y-1 font-medium dark:text-white">
            <div>{username}</div>
          </div>
        </Avatar>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
