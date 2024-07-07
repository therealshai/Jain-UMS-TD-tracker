
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStudentInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Student not found');
        return;
      }

      try {
        const response = await fetch('/api/student-info', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStudentInfo(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
          console.error('Error fetching student info:', errorData.error);
        }
      } catch (error) {
        setError(error.message);
        console.error('Fetch Error:', error);
      }
    };

    fetchStudentInfo();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!studentInfo) {
    return <div>Loading...</div>;
  }


  return (
    <div className="dashboard w-full min-h-screen bg-background-blue-light flex flex-col items-center p-6">
      <div className="header w-full max-w-4xl bg-background-blue p-4 rounded-lg shadow-md flex justify-between items-center">
        <div className="welcome flex items-center">
          <img
            src="image 1.png"
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-lg font-bold text-[#4B5563]">Welcome Back, {studentInfo.name}</h1>
            <p className="text-sm text-[#4B5563]">Student Dashboard</p>
          </div>
        </div>
      </div>
      <div className="content w-full max-w-4xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="box bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Student Info</h3>
          <div className="info-item flex justify-between mb-2">
            <span>Student Code</span>
            <strong>{studentInfo.usn}</strong>
          </div>
          <div className="info-item flex justify-between mb-2">
            <span>Semester</span>
            <strong>{studentInfo.semester}</strong>
          </div>
          <div className="info-item flex justify-between">
            <span>Branch Code</span>
            <strong>{studentInfo.branch}</strong>
          </div>
        </div>
        <div className="box bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Details</h3>
          <div className="info-item flex justify-between mb-2">
            <span>DOB</span>
            <strong>{studentInfo.dob}</strong>
          </div>
          <div className="info-item flex justify-between mb-2">
            <span>Father - Mother Name</span>
            <strong>Father</strong>
          </div>
          <div className="info-item flex justify-between">
            <span>Parent's Mobile No</span>
            <strong>{studentInfo.parentsMobile}</strong>
          </div>
        </div>
        <div className="box bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Bachelor of Technology</h3>
          <div className="info-item flex justify-between mb-2">
            <span>Branch</span>
            <strong>{studentInfo.branch}</strong>
          </div>
          <div className="info-item flex justify-between mb-2">
            <span>eMail</span>
            <strong>{studentInfo.email}</strong>
          </div>
          <div className="info-item flex justify-between mb-2">
            <span>Mobile No</span>
            <strong>{studentInfo.mobile}</strong>
          </div>
          <div className="info-item flex justify-between">
            <span>Aadhaar No</span>
            <strong>{studentInfo.aadhaar}</strong>
          </div>
        </div>
        <div className="box bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Additional Info</h3>
          <div className="info-item flex justify-between mb-2">
            <span>Hobbies</span>
            <strong>{studentInfo.hobbies}</strong>
          </div>
          <div className="info-item flex justify-between">
            <span>Address</span>
            <strong>{studentInfo.address}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;