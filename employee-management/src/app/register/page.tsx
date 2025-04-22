'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/adminHeader';

const Register = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    department: '',
    role: '',
    phone: '',
    designation: '',
    jobTitle: '',
    salary: '',
    status: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.email) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Invalid email format.';

    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';

    if (!form.name) newErrors.name = 'Name is required.';
    if (!form.address) newErrors.address = 'Address is required.';
    if (!form.department) newErrors.department = 'Department is required.';
    if (!form.role) newErrors.role = 'Role is required.';

    if (!form.phone) newErrors.phone = 'Phone is required.';
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = 'Phone must be 10 digits.';

    if (!form.designation) newErrors.designation = 'Designation is required.';
    if (!form.jobTitle) newErrors.jobTitle = 'Job title is required.';

    if (!form.salary) newErrors.salary = 'Salary is required.';
    else if (isNaN(Number(form.salary)) || Number(form.salary) <= 0)
      newErrors.salary = 'Salary must be a positive number.';

    if (!form.status) newErrors.status = 'Status is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = async (email: string) => {
    try {
      const res = await fetch(
        `http://localhost:8081/auth/check-email?email=${email}`
      );
      const data = await res.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});

    const isValid = validateForm();
    if (!isValid) return;

    const emailExists = await checkEmailExists(form.email);
    if (emailExists) {
      setErrors((prev) => ({
        ...prev,
        email: 'This email is already registered.',
      }));
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const resData = await response.json();

      if (!response.ok) {
        setErrors({ form: resData.message || 'Error registering employee.' });
      } else {
        setSuccess('Registered successfully!');
        setTimeout(() => router.push('/admin/dashboard'), 1500);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      setErrors({ form: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10 px-4">
      <AdminHeader />
      <div className="bg-white p-8 mt-6 rounded-lg shadow-lg w-full max-w-3xl text-black">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register New Employee
        </h2>

        {errors.form && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errors.form}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Register Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
