// store/slices/analyticsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Revenue Analytics
  revenue: {
    today: 125000,
    thisWeek: 780000,
    thisMonth: 3250000,
    lastMonth: 2980000,
    yearToDate: 28500000,
    trend: '+9.1%',
    dailyData: [
      { date: '2025-09-24', amount: 98000, orders: 12 },
      { date: '2025-09-25', amount: 125000, orders: 15 },
      { date: '2025-09-26', amount: 142000, orders: 18 },
      { date: '2025-09-27', amount: 135000, orders: 16 },
      { date: '2025-09-28', amount: 156000, orders: 19 },
      { date: '2025-09-29', amount: 124000, orders: 14 },
      { date: '2025-09-30', amount: 125000, orders: 15 }
    ],
    monthlyData: [
      { month: 'Jan', amount: 2850000 },
      { month: 'Feb', amount: 2920000 },
      { month: 'Mar', amount: 3100000 },
      { month: 'Apr', amount: 3050000 },
      { month: 'May', amount: 3280000 },
      { month: 'Jun', amount: 3150000 },
      { month: 'Jul', amount: 3350000 },
      { month: 'Aug', amount: 3180000 },
      { month: 'Sep', amount: 3250000 }
    ]
  },

  // Fleet Performance
  fleetPerformance: {
    totalVehicles: 45,
    activeVehicles: 38,
    utilizationRate: 84.4,
    averageFuelEfficiency: 6.8,
    maintenanceCost: 285000,
    vehicleData: [
      { type: 'Heavy Truck', count: 20, active: 17, utilization: 85 },
      { type: 'Medium Truck', count: 15, active: 13, utilization: 86.7 },
      { type: 'Light Truck', count: 10, active: 8, utilization: 80 }
    ]
  },

  // Delivery Performance
  deliveryPerformance: {
    totalDeliveries: 1250,
    onTimeDeliveries: 1138,
    onTimeRate: 91.04,
    averageDeliveryTime: 18.5,
    delayedDeliveries: 112,
    cancelledDeliveries: 8,
    deliveryTrend: [
      { date: '2025-09-24', total: 168, onTime: 152, delayed: 16 },
      { date: '2025-09-25', total: 182, onTime: 165, delayed: 17 },
      { date: '2025-09-26', total: 195, onTime: 178, delayed: 17 },
      { date: '2025-09-27', total: 178, onTime: 162, delayed: 16 },
      { date: '2025-09-28', total: 188, onTime: 171, delayed: 17 },
      { date: '2025-09-29', total: 172, onTime: 157, delayed: 15 },
      { date: '2025-09-30', total: 167, onTime: 153, delayed: 14 }
    ]
  },

  // Order Analytics
  orderAnalytics: {
    totalOrders: 1358,
    pendingOrders: 142,
    completedOrders: 1138,
    cancelledOrders: 78,
    averageOrderValue: 24500,
    topRoutes: [
      { route: 'Mumbai-Delhi', orders: 245, revenue: 6125000 },
      { route: 'Chennai-Bangalore', orders: 198, revenue: 4455000 },
      { route: 'Pune-Hyderabad', orders: 176, revenue: 3872000 },
      { route: 'Kolkata-Patna', orders: 145, revenue: 3190000 },
      { route: 'Ahmedabad-Surat', orders: 132, revenue: 2904000 }
    ],
    ordersByType: [
      { type: 'Express', count: 425, percentage: 31.3 },
      { type: 'Standard', count: 678, percentage: 49.9 },
      { type: 'Economy', count: 255, percentage: 18.8 }
    ]
  },

  // Customer Analytics
  customerAnalytics: {
    totalCustomers: 342,
    activeCustomers: 287,
    newCustomers: 23,
    customerRetentionRate: 83.9,
    topCustomers: [
      { name: 'Reliance Industries', orders: 89, revenue: 2225000 },
      { name: 'Tata Motors', orders: 76, revenue: 1900000 },
      { name: 'Mahindra Group', orders: 68, revenue: 1700000 },
      { name: 'Wipro Limited', orders: 54, revenue: 1350000 },
      { name: 'Infosys', orders: 48, revenue: 1200000 }
    ],
    customerSatisfaction: 4.6
  },

  // Cost Analytics
  costAnalytics: {
    totalCosts: 1850000,
    fuelCosts: 875000,
    maintenanceCosts: 285000,
    laborCosts: 520000,
    otherCosts: 170000,
    costBreakdown: [
      { category: 'Fuel', amount: 875000, percentage: 47.3 },
      { category: 'Labor', amount: 520000, percentage: 28.1 },
      { category: 'Maintenance', amount: 285000, percentage: 15.4 },
      { category: 'Other', amount: 170000, percentage: 9.2 }
    ]
  },

  // Time Period
  selectedPeriod: 'month', // 'day', 'week', 'month', 'year'
  dateRange: {
    start: '2025-09-01',
    end: '2025-09-30'
  },

  loading: false,
  error: null
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    // Update period
    setSelectedPeriod: (state, action) => {
      state.selectedPeriod = action.payload;
    },

    // Update date range
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },

    // Update revenue data
    updateRevenue: (state, action) => {
      state.revenue = { ...state.revenue, ...action.payload };
    },

    // Update fleet performance
    updateFleetPerformance: (state, action) => {
      state.fleetPerformance = { ...state.fleetPerformance, ...action.payload };
    },

    // Update delivery performance
    updateDeliveryPerformance: (state, action) => {
      state.deliveryPerformance = { ...state.deliveryPerformance, ...action.payload };
    },

    // Refresh all analytics
    refreshAnalytics: (state) => {
      state.loading = true;
    },

    // Set loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setSelectedPeriod,
  setDateRange,
  updateRevenue,
  updateFleetPerformance,
  updateDeliveryPerformance,
  refreshAnalytics,
  setLoading,
  setError
} = analyticsSlice.actions;

// Selectors
export const selectRevenue = (state) => state.analytics?.revenue || initialState.revenue;
export const selectFleetPerformance = (state) => state.analytics?.fleetPerformance || initialState.fleetPerformance;
export const selectDeliveryPerformance = (state) => state.analytics?.deliveryPerformance || initialState.deliveryPerformance;
export const selectOrderAnalytics = (state) => state.analytics?.orderAnalytics || initialState.orderAnalytics;
export const selectCustomerAnalytics = (state) => state.analytics?.customerAnalytics || initialState.customerAnalytics;
export const selectCostAnalytics = (state) => state.analytics?.costAnalytics || initialState.costAnalytics;
export const selectSelectedPeriod = (state) => state.analytics?.selectedPeriod || 'month';

export default analyticsSlice.reducer;