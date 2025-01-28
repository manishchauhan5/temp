import React from 'react';

const Dashboard = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <div className="mb-4">
          <h4 className="text-4xl font-bold">Dashboard</h4>
        </div>
        <div>
          <p className="text-lg text-gray-600">Welcome to your dashboard. Here you can manage your data.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
