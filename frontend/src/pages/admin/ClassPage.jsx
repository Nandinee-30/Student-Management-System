import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClassPage = () => {
  const students = [
    { id: 1, name: 'Aarav', email: 'aarav@example.com', rollNo: '01' },
    { id: 2, name: 'Isha', email: 'isha@example.com', rollNo: '02' },
  ];

  const navigate = useNavigate(); 
  const { id } = useParams();
  return (
    <>
      <div className="p-6 text-white bg-gray-900 min-h-screen">
        <div className='flex justify-between p-4'>
          <h1 className="text-2xl font-bold mb-4">Class {id} - Student Details</h1>
          <button onClick={() => navigate('/admin/manage-students')} className="px-4 py-2 rounded-full bg-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-200 text-white hover:bg-gray-300 hover:text-black cursor-pointer">Go Back</button>
        </div>
        <table className="table-auto w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="bg-gray-900">
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.email}</td>
                <td className="px-4 py-2 border">{student.rollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ClassPage;
