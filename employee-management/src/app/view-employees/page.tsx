'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/adminHeader';

type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  jobTitle: string;
  salary: string;
  status: string;
};

const ViewEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/admin/get-all-employees', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      setEmployees(data.employeesList); 
    } catch (err: unknown) {
      console.error(err);
      setError('Failed to load employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/updateEmployee/${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8081/admin/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      alert('Employee deleted successfully');
      fetchEmployees(); // Refresh after delete
    } catch (err) {
      console.error(err);
      setError('Failed to delete employee');
    }
  };

  if (error) {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div>
        <AdminHeader/>
      </div>
      <div className="max-w-6xl mx-auto mt-15 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-black text-center">All Employees</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Designation</th>
                <th className="p-3 border">Job Title</th>
                <th className="p-3 border">Salary</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="text-black border-t hover:bg-gray-100">
                  <td className="p-3 border">{emp.name}</td>
                  <td className="p-3 border">{emp.email}</td>
                  <td className="p-3 border">{emp.department}</td>
                  <td className="p-3 border">{emp.designation}</td>
                  <td className="p-3 border">{emp.jobTitle}</td>
                  <td className="p-3 border">{emp.salary}</td>
                  <td className="p-3 border">{emp.status}</td>
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => handleEdit(emp.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 p-4">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployees;
