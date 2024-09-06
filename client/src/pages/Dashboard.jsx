import React from 'react';
import NavBar from '../components/NavBar';
import DashboardTable from '../components/DashboardTable';

const Dashboard = () => {
  return (
    <div className="container mx-auto w-screen h-screen">
      <NavBar />
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
