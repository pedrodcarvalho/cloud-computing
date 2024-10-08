import React from 'react';
import NavBar from '../components/NavBar';
import SettingsContainer from '../components/SettingsContainer';

const Settings = () => {
  return (
    <div className="container mx-auto w-screen h-screen">
      <NavBar />
      <SettingsContainer />
    </div>
  );
};

export default Settings;
