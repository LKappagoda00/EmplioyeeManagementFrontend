'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const EmployeeDashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Tasks</h2>
            <p className="text-2xl mt-2">12</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Attendance</h2>
            <p className="text-2xl mt-2">95%</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Status</h2>
            <p className="text-xl mt-2 text-green-600 font-bold">Active</p>
          </div>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Submitted daily report</li>
            <li>Updated profile information</li>
            <li>Attended team meeting</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
