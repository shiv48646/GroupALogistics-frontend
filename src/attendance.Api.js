import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class AttendanceApi {
  constructor() {
    this.baseURL = `${API_BASE_URL}/attendance`;
  }

  // Get all attendance records
  async getAllAttendance(params = {}) {
    try {
      const response = await axios.get(this.baseURL, { params });
      return {
        success: true,
        data: response.data,
        message: 'Attendance records fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch attendance records'
      };
    }
  }

  // Get attendance by employee ID
  async getAttendanceByEmployee(employeeId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/employee/${employeeId}`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Employee attendance fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch employee attendance'
      };
    }
  }

  // Get attendance by date range
  async getAttendanceByDateRange(startDate, endDate, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/date-range`, {
        params: { startDate, endDate, ...params }
      });
      return {
        success: true,
        data: response.data,
        message: 'Attendance records fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch attendance records'
      };
    }
  }

  // Clock in
  async clockIn(attendanceData) {
    try {
      const response = await axios.post(`${this.baseURL}/clock-in`, attendanceData);
      return {
        success: true,
        data: response.data,
        message: 'Clocked in successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to clock in'
      };
    }
  }

  // Clock out
  async clockOut(attendanceId, clockOutData) {
    try {
      const response = await axios.patch(`${this.baseURL}/${attendanceId}/clock-out`, clockOutData);
      return {
        success: true,
        data: response.data,
        message: 'Clocked out successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to clock out'
      };
    }
  }

  // Create attendance record
  async createAttendance(attendanceData) {
    try {
      const response = await axios.post(this.baseURL, attendanceData);
      return {
        success: true,
        data: response.data,
        message: 'Attendance record created successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create attendance record'
      };
    }
  }

  // Update attendance record
  async updateAttendance(attendanceId, updateData) {
    try {
      const response = await axios.put(`${this.baseURL}/${attendanceId}`, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Attendance record updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update attendance record'
      };
    }
  }

  // Delete attendance record
  async deleteAttendance(attendanceId) {
    try {
      const response = await axios.delete(`${this.baseURL}/${attendanceId}`);
      return {
        success: true,
        data: response.data,
        message: 'Attendance record deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to delete attendance record'
      };
    }
  }

  // Get attendance statistics
  async getAttendanceStats(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/stats`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Attendance statistics fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch attendance statistics'
      };
    }
  }

  // Generate attendance report
  async generateReport(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/report`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Attendance report generated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to generate attendance report'
      };
    }
  }
}

export default new AttendanceApi();