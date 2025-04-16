import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudentDashboard = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const logs = JSON.parse(localStorage.getItem("attendance_logs")) || [];

    // Filter for the logged-in student
    const studentLogs = logs.filter((log) => log.studentId === user.email);

    // Group by weeks (simple approach)
    const weeks = {
      "Week 1": [],
      "Week 2": [],
      "Week 3": [],
      "Week 4": [],
    };

    studentLogs.forEach((log) => {
      const day = new Date(log.date).getDate();
      if (day <= 7) weeks["Week 1"].push(log);
      else if (day <= 14) weeks["Week 2"].push(log);
      else if (day <= 21) weeks["Week 3"].push(log);
      else weeks["Week 4"].push(log);
    });

    const weekLabels = Object.keys(weeks);
    const attendancePercentages = weekLabels.map((week) => {
      const total = weeks[week].length;
      const present = weeks[week].filter((log) => log.status === "Present").length;
      return total === 0 ? 0 : Math.round((present / total) * 100);
    });

    const chartData = {
      labels: weekLabels,
      datasets: [
        {
          label: "Attendance %",
          data: attendancePercentages,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };

    setChartData(chartData);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Attendance Overview</h1>
      {chartData?.labels ? <Bar data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default StudentDashboard;
