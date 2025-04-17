// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";

// Pages
import Home from "./pages/Home";
import TeachDashboard from "./pages/teacher/TeachDashboard";
import ClassSelection from "./pages/ClassSelection";
import MarkAttendance from "./pages/teacher/MarkAttendance";
import ConfirmationPage from "./pages/ConfirmationPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import AttendanceDetails from "./pages/student/AttendanceDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Optional landing page */}
        <Route path="/" element={<Home />} />

        {/* Teacher Routes */}
        <Route path="/teacher/*" element={<TeacherLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TeachDashboard />} />
          <Route path="classes" element={<ClassSelection />} />
          <Route path="attendance/:classId" element={<MarkAttendance />} />
          <Route path="confirmation" element={<ConfirmationPage />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student/*" element={<StudentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attendance-details" element={<AttendanceDetails />} />
        </Route>

        {/* Catch‑all 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-center text-xl p-4">
              404 – Page Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
