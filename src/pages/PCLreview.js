import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PCLreview = () => {
  const [projectRatings, setProjectRatings] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [weeklyMeetings, setWeeklyMeetings] = useState([]);
  const [teamInformation, setTeamInformation] = useState([]);

  useEffect(() => {
    const fetchProjectRatings = async () => {
      try {
        const response = await axios.get('/api/project-ratings');
        setProjectRatings(response.data);
      } catch (error) {
        console.error('Error fetching project ratings:', error);
      }
    };

    const fetchAttendance = async () => {
      try {
        const response = await axios.get('/api/attendance');
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    const fetchWeeklyMeetings = async () => {
      try {
        const response = await axios.get('/api/weekly-meetings');
        setWeeklyMeetings(response.data);
      } catch (error) {
        console.error('Error fetching weekly meetings:', error);
      }
    };

    const fetchTeamInformation = async () => {
      try {
        const response = await axios.get('/api/team-information');
        setTeamInformation(response.data);
      } catch (error) {
        console.error('Error fetching team information:', error);
      }
    };

    fetchProjectRatings();
    fetchAttendance();
    fetchWeeklyMeetings();
    fetchTeamInformation();
  }, []);

  return (
    <div className="container mx-auto p-6  bg-background-blue-light">
      <h1 className="text-3xl font-bold text-button-blue mb-6">PCL Review</h1>

      <div className="box bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-button-blue mb-4">Project Ratings</h2>
        <table className="min-w-full bg-white border border-background-blue-light">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Project Name</th>
              <th className="px-4 py-2 border-b">Student Name</th>
              <th className="px-4 py-2 border-b">Rating</th>
              <th className="px-4 py-2 border-b">Comments</th>
            </tr>
          </thead>
          <tbody>
            {projectRatings.map((rating, index) => (
              <tr key={index} className="hover:bg-background-blue-light">
                <td className="border px-4 py-2">{rating.projectName}</td>
                <td className="border px-4 py-2">{rating.studentName}</td>
                <td className="border px-4 py-2">{rating.rating}</td>
                <td className="border px-4 py-2">{rating.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="box bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-button-blue mb-4">Attendance</h2>
        <table className="min-w-full bg-white border border-background-blue-light">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Days Present</th>
              <th className="px-4 py-2 border-b">Total Days</th>
              <th className="px-4 py-2 border-b">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={index} className="hover:bg-background-blue-light">
                <td className="border px-4 py-2">{record.date}</td>
                <td className="border px-4 py-2">{record.daysPresent}</td>
                <td className="border px-4 py-2">{record.totalDays}</td>
                <td className="border px-4 py-2">{record.attendancePercent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="box bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-button-blue mb-4">Weekly Meetings</h2>
        <table className="min-w-full bg-white border border-background-blue-light">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Topic</th>
              <th className="px-4 py-2 border-b">Attendees</th>
              <th className="px-4 py-2 border-b">Notes</th>
            </tr>
          </thead>
          <tbody>
            {weeklyMeetings.map((meeting, index) => (
              <tr key={index} className="hover:bg-background-blue-light">
                <td className="border px-4 py-2">{meeting.date}</td>
                <td className="border px-4 py-2">{meeting.topic}</td>
                <td className="border px-4 py-2">{meeting.attendees}</td>
                <td className="border px-4 py-2">{meeting.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="box bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-button-blue mb-4">Team Information</h2>
        <table className="min-w-full bg-white border border-background-blue-light">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">USN</th>
            </tr>
          </thead>
          <tbody>
            {teamInformation.map((member, index) => (
              <tr key={index} className="hover:bg-background-blue-light">
                <td className="border px-4 py-2">{member.name}</td>
                <td className="border px-4 py-2">{member.usn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PCLreview;
