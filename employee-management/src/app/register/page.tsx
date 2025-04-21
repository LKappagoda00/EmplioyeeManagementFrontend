'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormFields = {
  name: string;
  email: string;
  password: string;
  address: string;
  department: string;
  role: string;
  phone: string;
  designation: string;
  jobTitle: string;
  salary: number;
  status: string;
};

const Register = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormFields>({
    name: '',
    email: '',
    password: '',
    address: '',
    department: '',
    role: '',
    phone: '',
    designation: '',
    jobTitle: '',
    salary: 0,
    status: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'salary' ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.address ||
      !form.department ||
      !form.role ||
      !form.phone ||
      !form.designation ||
      !form.jobTitle ||
      form.salary <= 0 ||
      !form.status
    ) {
      return 'All fields are required and salary must be greater than 0.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return 'Please enter a valid email address.';
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phone)) {
      return 'Please enter a valid 10-digit phone number.';
    }

    if (form.password.length < 6) {
      return 'Password should be at least 6 characters.';
    }

    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const resData = await response.json();
        setError(resData.message || 'Error registering employee.');
      } else {
        setSuccess('Registered successfully!');
        setTimeout(() => {
          router.push('/admin/dashboard'); // navigate to dashboard
        }, 1500);
      }
    } catch  {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Register New Employee</h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Address', name: 'address', type: 'text' },
            { label: 'Department', name: 'department', type: 'text' },
            { label: 'Role', name: 'role', type: 'text' },
            { label: 'Phone', name: 'phone', type: 'text' },
            { label: 'Designation', name: 'designation', type: 'text' },
            { label: 'Job Title', name: 'jobTitle', type: 'text' },
            { label: 'Salary', name: 'salary', type: 'number' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={
                  name === 'salary'
                    ? form.salary.toString()
                    : (form[name as keyof FormFields] as string)
                }
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>
          ))}

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
