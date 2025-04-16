// src/pages/student/AttendanceDetails.jsx
import React, { useEffect, useState } from "react";

const AttendanceDetails = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("attendance_logs")) || [];
    setRecords(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Details</h1>
      {records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">Date</th>
                <th className="text-left p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{record.date}</td>
                  <td className={`p-3 font-medium ${record.status === "Present" ? "text-green-600" : "text-red-500"}`}>
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;
