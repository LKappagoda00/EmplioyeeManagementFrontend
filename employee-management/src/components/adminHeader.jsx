'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AdminHeader = () => {
  const router = useRouter();
   const handleLogout = () => {
      localStorage.clear();
      sessionStorage.clear();
      toast.success('Logged out successfully');
      router.push('/login');
    };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow mb-6">
      <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
      <div className="flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => router.push('/register')}
        >
          Register Employee
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          onClick={() => router.push('/view-employees')}
        >
          View All Employees
        </button>
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
      </div>
    </div>
  );
};

export default AdminHeader;
