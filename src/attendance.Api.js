import axios from 'axios';

// ✅ Base backend URL (from .env.local or fallback)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.18:5000'; // 👈 Update this IP if backend runs elsewhere

class AttendanceApi {
  constructor() {
    // Base URL for attendance-related endpoints
    this.baseURL = `${API_BASE_URL}/api/attendance`;
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  // ✅ Backend connection test (checks /health endpoint)
  async checkConnection() {
    console.log('🚀 Testing backend connection...');
    try {
      const response = await this.api.get('/health'); // ✅ correct endpoint
      if (response.data?.success) {
        console.log('✅ Backend Connected:', response.data);
      } else {
        console.warn('⚠️ Unexpected backend response:', response.data);
      }
      return {
        success: true,
        data: response.data,
        message: 'Backend is reachable',
      };
    } catch (error) {
      console.error('❌ Backend Connection Failed:', error.message);
      if (error.code === 'ERR_NETWORK') {
        console.warn(`⚠️ Check if backend is running at ${API_BASE_URL}`);
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Backend not reachable',
      };
    }
  }

  // ✅ Get all attendance records
  async getAllAttendance(params = {}) {
    try {
      const response = await this.api.get(`${this.baseURL}`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Attendance records fetched successfully',
      };
    } catch (error) {
      console.error('❌ Error fetching all attendance:', error.message);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || 'Failed to fetch attendance records',
      };
    }
  }

  // ✅ Get attendance by employee ID
  async getAttendanceByEmployee(employeeId, params = {}) {
    try {
      const response = await this.api.get(`${this.baseURL}/employee/${employeeId}`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Employee attendance fetched successfully',
      };
    } catch (error) {
      console.error('❌ Error fetching employee attendance:', error.message);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message ||
          'Failed to fetch employee attendance',
      };
    }
  }

  // ✅ Get attendance by date range
  async getAttendanceByDateRange(startDate, endDate, params = {}) {
    try {
      const response = await this.api.get(`${this.baseURL}/date-range`, {
        params: { startDate, endDate, ...params },
      });
      return {
        success: true,
        data: response.data,
        message: 'Attendance records fetched successfully',
      };
    } catch (error) {
      console.error('❌ Error fetching date-range attendance:', error.message);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || 'Failed to fetch attendance records',
      };
    }
  }

  // ✅ Clock in
  async clockIn(attendanceData) {
    try {
      const response = await this.api.post(`${this.baseURL}/clock-in`, attendanceData);
      return {
        success: true,
        data: response.data,
        message: 'Clocked in successfully',
      };
    } catch (error) {
      console.error('❌ Error clocking in:', error.message);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to clock in',
      };
    }
  }

  // ✅ Clock out
  async clockOut(attendanceId, clockOutData) {
    try {
      const response = await this.api.patch(`${this.baseURL}/${attendanceId}/clock-out`, clockOutData);
      return {
        success: true,
        data: response.data,
        message: 'Clocked out successfully',
      };
    } catch (error) {
      console.error('❌ Error clocking out:', error.message);
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to clock out',
      };
    }
  }

  // ✅ Create attendance record
  async createAttendance(attendanceData) {
    try {
      const response = await this.api.post(`${this.baseURL}`, attendanceData);
      return {
        success: true,
        data: response.data,
        message: 'Attendance record created successfully',
      };
    } catch (error) {
      console.error('❌ Error creating attendance:', error.message);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || 'Failed to create attendance record',
      };
    }
  }

  // ✅ Update attendance record
  async updateAttendance(attendanceId, updateData) {
    try {
      const response = await this.api.put(`${this.baseURL}/${attendanceId}`, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Attendance record updated successfully',
      };
    } catch (error) {
      console.error('❌ Error updating attendance:', error.message);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || 'Failed to update attendance record',
      };
    }
  }

  // ✅ Delete attendance record
  async deleteAttendance(attendanceId) {
    try {
      const response = await this.api.delete(`${this.baseURL}/${attendanceId}`);
      return {
        success: true,
        data: response.data,
        message: 'Attendance record deleted successfully',
      };
    } catch (error) {
      console.error('❌ Error deleting attendance:', error.message);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || 'Failed to delete attendance record',
      };
    }
  }

  // ✅ Get attendance statistics
  async getAttendanceStats(params = {}) {
    try {
      const response = await this.api.get(`${this.baseURL}/stats`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Attendance statistics fetched successfully',
      };
    } catch (error) {
      console.error('❌ Error fetching attendance stats:', error.message);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message || 'Failed to fetch attendance stats',
      };
    }
  }

  // ✅ Generate attendance report
  async generateReport(params = {}) {
    try {
      const response = await this.api.get(`${this.baseURL}/report`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Attendance report generated successfully',
      };
    } catch (error) {
      console.error('❌ Error generating report:', error.message);
      return {
        success: false,
        data: null,
        message:
          error.response?.data?.message ||
          'Failed to generate attendance report',
      };
    }
  }
}
export default new AttendanceApi();
