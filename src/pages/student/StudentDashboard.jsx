import React, { useEffect, useState } from 'react'
import { Bar, Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
} from 'chart.js'
import { getUsers } from '../../utils/authStorage'
import { getAttendanceRecords, getAttendance } from '../../utils/storage'

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
)

const StudentDashboard = () => {
  const [studentId, setStudentId] = useState('itc001')
  const [logs, setLogs] = useState([])
  const [chartData, setChartData] = useState(null)
  const [pieData, setPieData] = useState(null)
  const [subjectPieData, setSubjectPieData] = useState(null)
  const [yearlyChart, setYearlyChart] = useState(null)
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [classFilter, setClassFilter] = useState('')
  const [classList, setClassList] = useState([])
  const [alert, setAlert] = useState(null)

  // Subject name mapping (you can expand this based on your actual data)
  const subjectNames = {
    'itc101': 'Math',
    'itc102': 'Physics',
    'itc103': 'Chemistry',
    'itc104': 'Programming',
    // Add other subjects as needed
  }

  useEffect(() => {
    const users = getUsers().filter(u => u.role === 'student')
    setStudents(users)
    const uniqueClasses = Array.from(new Set(users.map(s => `${s.branch}-${s.division}`)))
    setClassList(uniqueClasses)
  }, [])

  useEffect(() => {
    const filtered = classFilter
      ? students.filter(s => `${s.branch}-${s.division}` === classFilter)
      : students
    setFilteredStudents(filtered)
    if (filtered.length > 0) setStudentId(filtered[0].userId)
  }, [classFilter, students])

  useEffect(() => {
    const records = getAttendanceRecords()
    const weeks = { 'Week 1': [], 'Week 2': [], 'Week 3': [], 'Week 4': [] }
    const detailedLogs = []
    const subjectMap = {}

    records.forEach(record => {
      const data = getAttendance(record.classId, record.date)
      if (!data) return
      const match = data.find(s => s.id === studentId)
      if (match) {
        const day = new Date(record.date).getDate()
        let week = 'Week 4'
        if (day <= 7) week = 'Week 1'
        else if (day <= 14) week = 'Week 2'
        else if (day <= 21) week = 'Week 3'
        weeks[week].push(match)
        detailedLogs.push({ ...match, date: record.date, classId: record.classId })

        if (!subjectMap[record.classId]) subjectMap[record.classId] = []
        subjectMap[record.classId].push(match)
      }
    })

    setLogs(detailedLogs.reverse())

    const weekLabels = Object.keys(weeks)
    const attendancePercentages = weekLabels.map(week => {
      const total = weeks[week].length
      const present = weeks[week].filter(log => log.status === 'present').length
      return total === 0 ? 0 : Math.round((present / total) * 100)
    })

    setChartData({
      labels: weekLabels,
      datasets: [
        {
          label: 'Overall Attendance %',
          data: attendancePercentages,
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }
      ]
    })

    const statusCounts = detailedLogs.reduce((acc, log) => {
      acc[log.status] = (acc[log.status] || 0) + 1
      return acc
    }, {})

    setPieData({
      labels: Object.keys(statusCounts).map(s => s.charAt(0).toUpperCase() + s.slice(1)),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: ['#4caf50', '#f44336', '#ff9800', '#03a9f4', '#9e9e9e']
        }
      ]
    })

    const subjectCounts = {}
    detailedLogs.forEach(log => {
      if (!subjectCounts[log.classId]) subjectCounts[log.classId] = { present: 0, total: 0 }
      subjectCounts[log.classId].total++
      if (log.status === 'present') subjectCounts[log.classId].present++
    })

    const subjectLabels = Object.keys(subjectCounts).map(subjectId => subjectNames[subjectId] || subjectId)
    const subjectRates = Object.keys(subjectCounts).map(subjectId => {
      const { present, total } = subjectCounts[subjectId]
      return Math.round((present / total) * 100)
    })

    setSubjectPieData({
      labels: subjectLabels,
      datasets: [
        {
          data: subjectRates,
          backgroundColor: [
            '#36a2eb', '#ff6384', '#ffcd56', '#4bc0c0', '#9966ff',
            '#c9cbcf', '#f67019', '#00a950', '#e80058'
          ]
        }
      ]
    })

    const monthlyMap = Array(12).fill(null).map(() => ({ present: 0, total: 0 }))
    detailedLogs.forEach(log => {
      const month = new Date(log.date).getMonth()
      monthlyMap[month].total++
      if (log.status === 'present') monthlyMap[month].present++
    })

    const monthlyLabels = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const monthlyRates = monthlyMap.map(({ present, total }) =>
      total === 0 ? 0 : Math.round((present / total) * 100)
    )

    setYearlyChart({
      labels: monthlyLabels,
      datasets: [
        {
          label: 'Monthly Attendance %',
          data: monthlyRates,
          fill: false,
          borderColor: '#4c51bf',
          backgroundColor: '#4c51bf',
          tension: 0.2,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    })

    const totalLogs = detailedLogs.length
    const totalPresent = detailedLogs.filter(l => l.status === 'present').length
    const attendanceRate = totalLogs ? Math.round((totalPresent / totalLogs) * 100) : 0
    if (attendanceRate < 75) {
      setAlert(`Alert: Your overall attendance is ${attendanceRate}%, which is below 75%. Please attend more classes!`)
    } else {
      setAlert(null)
    }
  }, [studentId, classFilter])

  const handleExport = () => {
    const csv = logs.map(l => `${l.date},${l.classId},${l.status}`).join('\n')
    const blob = new Blob([`Date,Class,Status\n${csv}`], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${studentId}_attendance.csv`
    a.click()
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Class
        </label>
        <select
          className="w-full max-w-sm border rounded px-3 py-2"
          value={classFilter}
          onChange={e => setClassFilter(e.target.value)}
        >
          <option value="">All Classes</option>
          {classList.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Student
        </label>
        <select
          className="w-full max-w-sm border rounded px-3 py-2"
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
        >
          {filteredStudents.map(s => (
            <option key={s.userId} value={s.userId}>
              {s.name} ({s.userId})
            </option>
          ))}
        </select>
      </div>

      {alert && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {alert}
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">Attendance Overview</h2>
        {chartData ? <Bar data={chartData} /> : <p>Loading chart...</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Status Distribution</h2>
          {pieData ? <Pie data={pieData} /> : <p>Loading pie chart...</p>}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Subject-wise Attendance %</h2>
          {subjectPieData ? <Pie data={subjectPieData} /> : <p>Loading pie chart...</p>}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Yearly Attendance Trend</h2>
        {yearlyChart ? <Line data={yearlyChart} /> : <p>Loading yearly chart...</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Attendance Logs</h2>
        {logs.length === 0 ? (
          <p>No attendance data for this student.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 border-b">Date</th>
                  <th className="text-left p-3 border-b">Class</th>
                  <th className="text-left p-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{log.date}</td>
                    <td className="p-3">{log.classId}</td>
                    <td className="p-3">{log.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export Logs as CSV
        </button>
      </div>
    </div>
  )
}

export default StudentDashboard
