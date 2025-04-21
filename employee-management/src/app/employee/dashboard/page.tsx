'use client';
import React, { useEffect, useState } from 'react';
import EmployeeHeader from '@/components/employeeHeader';
import { useRouter } from 'next/navigation';

type EmployeeProfile = {
    id: number;
    name: string;
    email: string;
    role: string;
    JobTitle: string;
    Department: string;
    address: string;
    phone: string;
    designation: string;
    status: string;
    salary: number;
};

const EmployeeDashboard = () => {
    const [profile, setProfile] = useState<EmployeeProfile | null>(null);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {

        const token = localStorage.getItem('token');

        if (!token) {
            setError('Unauthorized or session expired');
            router.push('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8081/adminEmployee/get-profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 403 || response.status === 401) {
                    setError('Unauthorized or session expired');
                    localStorage.clear();
                    router.push('/login');
                    return;
                }

                const json = await response.json();
                const data: EmployeeProfile = {
                    id: json.employees.id,
                    name: json.employees.name,
                    email: json.employees.email,
                    role: json.employees.role,
                    JobTitle: json.employees.jobTitle,
                    Department: json.employees.department,
                    address: json.employees.address,
                    phone: json.employees.phone,
                    designation: json.employees.designation,
                    status: json.employees.status,
                    salary: json.employees.salary,
                };
                setProfile(data);
            } catch (err) {
                console.error('Failed to fetch admin profile:', err);
                setError('Failed to load admin data.');
            }
        };

        fetchProfile();
    }, [router]);

    if (error) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-red-100">
            <div className="bg-white p-6 rounded shadow text-red-600">{error}</div>
          </div>
        );
      }
    
      if (!profile) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-lg font-medium text-gray-600">Loading...</div>
          </div>
        );
      }

    return (
        <div className="min-h-screen bg-gray-100 text-black">
            <EmployeeHeader />

            <div className="pt-24 px-6 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                 
                    

                    {/* Dashboard Cards */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">Total Tasks</h2>
                            <p className="text-2xl mt-2">12</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">Attendance</h2>
                            <p className="text-2xl mt-2">95%</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow col-span-1 sm:col-span-2">
                            <h2 className="text-lg font-semibold">Status</h2>
                            <p className="text-xl mt-2 text-green-600 font-bold">Active</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <section className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Submitted daily report</li>
                        <li>Updated profile information</li>
                        <li>Attended team meeting</li>
                    </ul>
                </section>
                   {/* Employee Profile */}
                <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-8">
                        <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Admin Profile</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 text-gray-700">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-lg font-medium">{profile.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-lg font-medium">{profile.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <p className="text-lg font-medium">{profile.role}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Job Title</p>
                                    <p className="text-lg font-medium">{profile.JobTitle}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Department</p>
                                    <p className="text-lg font-medium">{profile.Department}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-lg font-medium">{profile.address}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="text-lg font-medium">{profile.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Designation</p>
                                    <p className="text-lg font-medium">{profile.designation}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className={`text-lg font-bold ${profile.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                                        {profile.status}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Salary</p>
                                    <p className="text-lg font-medium">${profile.salary.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
