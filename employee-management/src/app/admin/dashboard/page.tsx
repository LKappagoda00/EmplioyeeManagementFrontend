'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/adminHeader'

// Define the type for admin profile
type AdminProfile = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const AdminDashboard = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
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
        const data: AdminProfile = {
          id: json.employees.id,
          name: json.employees.name,
          email: json.employees.email,
          role: json.employees.role,
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow text-black">
        <AdminHeader/>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
