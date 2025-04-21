'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminHeader from '@/components/adminHeader';

type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  jobTitle: string;
  salary: number;
  status: string;
  role: string;
  address: string;
};

type Errors = Partial<Record<keyof Employee, string>>;

const UpdateEmployeePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [formErrors, setFormErrors] = useState<Errors>({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8081/admin/get-employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch employee');

        const data = await response.json();
        if (data.employees) setEmployee(data.employees);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error loading employee data');
        setLoading(false);
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  const validateForm = () => {
    const errors: Errors = {};
    if (!employee) return errors;

    if (!employee.name.trim()) errors.name = 'Name is required';
    if (!employee.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(employee.email)) errors.email = 'Invalid email format';

    if (!employee.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10,15}$/.test(employee.phone)) errors.phone = 'Invalid phone number';

    if (!employee.department.trim()) errors.department = 'Department is required';
    if (!employee.designation.trim()) errors.designation = 'Designation is required';
    if (!employee.jobTitle.trim()) errors.jobTitle = 'Job title is required';
    if (!employee.address.trim()) errors.address = 'Address is required';
    if (!employee.role.trim()) errors.role = 'Role is required';

    if (!employee.salary || employee.salary <= 0) errors.salary = 'Salary must be a positive number';

    if (!employee.status.trim()) errors.status = 'Status is required';

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (employee) {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
      setFormErrors({ ...formErrors, [e.target.name]: '' }); // clear error
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8081/admin/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) throw new Error('Update failed');

      alert('Employee updated successfully');
      router.push('/view-employees');
    } catch (err) {
      console.error(err);
      setError('Failed to update employee');
    }
  };

  if (loading) return <div className="text-center text-gray-700 mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!employee) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="shadow-md">
        <AdminHeader />
      </div>

      <main className="max-w-6xl mx-auto mt-15 px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-10">Update Employee Details</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Phone', name: 'phone', type: 'text' },
              { label: 'Department', name: 'department', type: 'text' },
              { label: 'Designation', name: 'designation', type: 'text' },
              { label: 'Job Title', name: 'jobTitle', type: 'text' },
              { label: 'Address', name: 'address', type: 'text' },
              { label: 'Role', name: 'role', type: 'text' },
              { label: 'Salary', name: 'salary', type: 'number' },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block font-medium mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={employee[field.name as keyof Employee]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors[field.name as keyof Employee] && (
                  <p className="text-red-600 text-sm mt-1">{formErrors[field.name as keyof Employee]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="status" className="block font-medium mb-1">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={employee.status}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {formErrors.status && <p className="text-red-600 text-sm mt-1">{formErrors.status}</p>}
            </div>

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateEmployeePage;
