// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import ClassSelection from './pages/ClassSelection';
import AttendanceMarking from './pages/AttendanceMarking';
import ConfirmationPage from './pages/ConfirmationPage';
import TeachDashboard from './pages/teacher/TeachDashboard';
import MarkAttendance from './pages/teacher/MarkAttendance';
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher/*" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeachDashboard />} />
          <Route path="classes" element={<ClassSelection />} />
          <Route path="attendance/:classId" element={<MarkAttendance />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="confirmation" element={<ConfirmationPage />} />
        </Route>

        {/* Student Routes */}
        {/* <Route
          path="/student/*"
          element={
            <StudentLayout />
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attendance-details" element={<AttendanceDetails />} />
        </Route> */}

        <Route path="*" element={<h1 className="text-center text-xl p-4">404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
