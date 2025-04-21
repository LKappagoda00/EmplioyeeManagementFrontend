'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const EmployeeHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow px-6 py-4 flex items-center justify-between border-b border-gray-200">
      <h1 className="text-2xl font-bold text-black">Employee Dashboard</h1>
      <div className="flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => router.push('/register')}
        >
          View Profile
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

export default EmployeeHeader;
