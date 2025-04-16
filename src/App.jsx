import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Slider'
import Dashboard from './pages/Dashboard'
import ClassSelection from './pages/ClassSelection'
import AttendanceMarking from './pages/AttendanceMarking'
import ConfirmationPage from './pages/ConfirmationPage'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/classes" element={<ClassSelection />} />
              <Route path="/attendance/:classId" element={<AttendanceMarking />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App