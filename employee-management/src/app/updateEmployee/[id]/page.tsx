'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
};

const UpdateEmployeePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8081/admin/get-employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employee');
        }

        const data = await response.json();
        if (data.employees) {
          setEmployee(data.employees); // Directly using the employee object from the response
        }
        setLoading(false);
      } catch (err: unknown) {
        console.error(err);
        setError('Error loading employee data');
        setLoading(false);
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (employee) {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      if (!response.ok) {
        throw new Error('Update failed');
      }

      alert('Employee updated successfully');
      router.push('/view-employees');
    } catch (err: unknown) {
      console.error(err);
      setError('Failed to update employee');
    }
  };

  if (loading) return <div className="text-center text-black mt-4">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-4">{error}</div>;
  if (!employee) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow mt-6 rounded text-black">
      <h2 className="text-2xl font-bold mb-4">Update Employee</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={employee.phone}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={employee.jobTitle}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
          name="status"
          value={employee.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployeePage;
