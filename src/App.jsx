// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Home from "./pages/Home";
// import TeacherDashboard from "./pages/teacher/TeachDashboard";
// import MarkAttendance from "./pages/teacher/MarkAttendance";
// import StudentDashboard from "./pages/student/StudentDashboard";
// import AttendanceDetails from "./pages/student/AttendanceDetails";
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

        {/* Teacher Routes
        <Route
          // path="/teacher/*"
          // element={
          //   <ProtectedRoute role="teacher">
          //     <TeacherLayout />
          //   </ProtectedRoute>
          // }
        >
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
        </Route> */}

        {/* Student Routes */}
        {/* <Route
          path="/student/*"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
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
