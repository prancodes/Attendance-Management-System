// src/utils/storage.js
// Simple utility functions for storing data in localStorage

/**
 * Save attendance data to localStorage
 * @param {string} classId - The ID of the class
 * @param {string} date - The date in YYYY-MM-DD format
 * @param {Array} attendanceData - Array of student attendance records
 */
export const saveAttendance = (classId, date, attendanceData) => {
    try {
      // Create a key in format: attendance_classId_date
      const storageKey = `attendance_${classId}_${date}`;
      localStorage.setItem(storageKey, JSON.stringify(attendanceData));
      
      // Also save a list of all attendance records for easy lookup
      const savedRecords = getAttendanceRecords() || [];
      if (!savedRecords.some(record => record.key === storageKey)) {
        savedRecords.push({ 
          key: storageKey, 
          classId, 
          date, 
          timestamp: new Date().toISOString() 
        });
        localStorage.setItem('attendanceRecords', JSON.stringify(savedRecords));
      }
      
      return true;
    } catch (error) {
      console.error('Error saving attendance data:', error);
      return false;
    }
  };
  
  /**
   * Get attendance data from localStorage
   * @param {string} classId - The ID of the class
   * @param {string} date - The date in YYYY-MM-DD format
   * @returns {Array|null} - The attendance data or null if not found
   */
  export const getAttendance = (classId, date) => {
    try {
      const storageKey = `attendance_${classId}_${date}`;
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving attendance data:', error);
      return null;
    }
  };
  
  /**
   * Get a list of all saved attendance records
   * @returns {Array} - List of saved attendance records with class and date info
   */
  export const getAttendanceRecords = () => {
    try {
      const records = localStorage.getItem('attendanceRecords');
      return records ? JSON.parse(records) : [];
    } catch (error) {
      console.error('Error retrieving attendance records:', error);
      return [];
    }
  };
  
  /**
   * Delete an attendance record
   * @param {string} classId - The ID of the class
   * @param {string} date - The date in YYYY-MM-DD format
   * @returns {boolean} - Success or failure
   */
  export const deleteAttendance = (classId, date) => {
    try {
      const storageKey = `attendance_${classId}_${date}`;
      localStorage.removeItem(storageKey);
      
      // Update the list of records
      const savedRecords = getAttendanceRecords();
      const updatedRecords = savedRecords.filter(record => record.key !== storageKey);
      localStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
      
      return true;
    } catch (error) {
      console.error('Error deleting attendance data:', error);
      return false;
    }
  };
  
  /**
   * Clear all attendance data from localStorage
   * @returns {boolean} - Success or failure
   */
  export const clearAllAttendance = () => {
    try {
      const records = getAttendanceRecords();
      
      // Remove each individual attendance record
      records.forEach(record => {
        localStorage.removeItem(record.key);
      });
      
      // Clear the records list
      localStorage.removeItem('attendanceRecords');
      
      return true;
    } catch (error) {
      console.error('Error clearing attendance data:', error);
      return false;
    }
  };