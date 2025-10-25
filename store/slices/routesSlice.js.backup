// store/slices/routesSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  routes: [
    {
      id: 'RT001',
      routeName: 'Mumbai-Delhi Express',
      origin: { 
        name: 'Mumbai Warehouse', 
        address: 'Andheri East, Mumbai',
        lat: 19.1136, 
        lng: 72.8697 
      },
      destination: { 
        name: 'Delhi Distribution Center', 
        address: 'Dwarka, New Delhi',
        lat: 28.5921, 
        lng: 77.0460 
      },
      stops: [
        { name: 'Surat Hub', address: 'Ring Road, Surat', lat: 21.1702, lng: 72.8311 },
        { name: 'Ahmedabad Depot', address: 'SG Highway, Ahmedabad', lat: 23.0225, lng: 72.5714 }
      ],
      driver: { id: 'DR001', name: 'Rajesh Kumar', phone: '+91 98765 43210' },
      vehicle: { id: 'VH001', number: 'MH-01-AB-1234', type: 'Heavy Truck' },
      distance: '1,450 km',
      estimatedTime: '22 hours',
      actualTime: null,
      status: 'active',
      priority: 'high',
      cost: '₹45,000',
      fuelCost: '₹22,000',
      createdAt: '2025-09-28T08:30:00',
      startedAt: '2025-09-28T09:00:00',
      completedAt: null,
      orders: ['ORD001', 'ORD002', 'ORD003'],
      notes: 'High priority delivery - perishable goods'
    },
    {
      id: 'RT002',
      routeName: 'Chennai-Bangalore Quick',
      origin: { 
        name: 'Chennai Port', 
        address: 'Chennai Harbor',
        lat: 13.0827, 
        lng: 80.2707 
      },
      destination: { 
        name: 'Bangalore Tech Hub', 
        address: 'Whitefield, Bangalore',
        lat: 12.9698, 
        lng: 77.7500 
      },
      stops: [],
      driver: { id: 'DR002', name: 'Suresh Patel', phone: '+91 98888 12345' },
      vehicle: { id: 'VH002', number: 'TN-09-CD-5678', type: 'Medium Truck' },
      distance: '346 km',
      estimatedTime: '6 hours',
      actualTime: '5.5 hours',
      status: 'completed',
      priority: 'medium',
      cost: '₹12,000',
      fuelCost: '₹5,500',
      createdAt: '2025-09-27T10:00:00',
      startedAt: '2025-09-27T11:00:00',
      completedAt: '2025-09-27T16:30:00',
      orders: ['ORD004', 'ORD005'],
      notes: 'Electronics delivery - handle with care'
    },
    {
      id: 'RT003',
      routeName: 'Pune-Hyderabad Regular',
      origin: { 
        name: 'Pune Industrial Area', 
        address: 'Pimpri-Chinchwad, Pune',
        lat: 18.6298, 
        lng: 73.7997 
      },
      destination: { 
        name: 'Hyderabad Logistics Park', 
        address: 'Shamshabad, Hyderabad',
        lat: 17.2403, 
        lng: 78.4294 
      },
      stops: [
        { name: 'Solapur Junction', address: 'Solapur City', lat: 17.6599, lng: 75.9064 }
      ],
      driver: { id: 'DR003', name: 'Amit Singh', phone: '+91 97777 98765' },
      vehicle: { id: 'VH003', number: 'MH-12-EF-9012', type: 'Heavy Truck' },
      distance: '560 km',
      estimatedTime: '9 hours',
      actualTime: null,
      status: 'planning',
      priority: 'low',
      cost: '₹18,500',
      fuelCost: '₹8,800',
      createdAt: '2025-09-30T07:00:00',
      startedAt: null,
      completedAt: null,
      orders: ['ORD006'],
      notes: 'Regular weekly shipment'
    },
    {
      id: 'RT004',
      routeName: 'Kolkata-Patna Express',
      origin: { 
        name: 'Kolkata Central Warehouse', 
        address: 'Salt Lake, Kolkata',
        lat: 22.5726, 
        lng: 88.3639 
      },
      destination: { 
        name: 'Patna Distribution Hub', 
        address: 'Boring Road, Patna',
        lat: 25.5941, 
        lng: 85.1376 
      },
      stops: [],
      driver: { id: 'DR004', name: 'Vikram Malhotra', phone: '+91 96666 54321' },
      vehicle: { id: 'VH004', number: 'WB-06-GH-3456', type: 'Medium Truck' },
      distance: '588 km',
      estimatedTime: '11 hours',
      actualTime: null,
      status: 'in-transit',
      priority: 'high',
      cost: '₹21,000',
      fuelCost: '₹9,500',
      createdAt: '2025-09-29T06:00:00',
      startedAt: '2025-09-29T07:30:00',
      completedAt: null,
      orders: ['ORD007', 'ORD008'],
      notes: 'Monitor weather conditions - monsoon season'
    }
  ],
  selectedRoute: null,
  filters: {
    status: 'all',
    priority: 'all',
    searchQuery: ''
  },
  statistics: {
    totalRoutes: 4,
    activeRoutes: 1,
    completedRoutes: 1,
    inTransitRoutes: 1,
    plannedRoutes: 1,
    totalDistance: '2,944 km',
    totalCost: '₹96,500',
    averageTime: '12 hours'
  },
  loading: false,
  error: null
};

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    // Create new route
    createRoute: (state, action) => {
      state.routes.unshift(action.payload);
      state.statistics.totalRoutes += 1;
      state.statistics.plannedRoutes += 1;
    },

    // Update existing route
    updateRoute: (state, action) => {
      const index = state.routes.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        const oldStatus = state.routes[index].status;
        const newStatus = action.payload.status;
        
        state.routes[index] = { ...state.routes[index], ...action.payload };
        
        // Update statistics if status changed
        if (oldStatus !== newStatus) {
          state.statistics[`${oldStatus}Routes`] = Math.max(0, state.statistics[`${oldStatus}Routes`] - 1);
          state.statistics[`${newStatus}Routes`] = (state.statistics[`${newStatus}Routes`] || 0) + 1;
        }
      }
    },

    // Delete route
    deleteRoute: (state, action) => {
      const route = state.routes.find(r => r.id === action.payload);
      if (route) {
        state.statistics.totalRoutes -= 1;
        state.statistics[`${route.status}Routes`] = Math.max(0, state.statistics[`${route.status}Routes`] - 1);
        state.routes = state.routes.filter(r => r.id !== action.payload);
      }
    },

    // Start route
    startRoute: (state, action) => {
      const route = state.routes.find(r => r.id === action.payload);
      if (route) {
        route.status = 'in-transit';
        route.startedAt = new Date().toISOString();
        state.statistics.plannedRoutes -= 1;
        state.statistics.inTransitRoutes += 1;
      }
    },

    // Complete route
    completeRoute: (state, action) => {
      const route = state.routes.find(r => r.id === action.payload.routeId);
      if (route) {
        route.status = 'completed';
        route.completedAt = new Date().toISOString();
        route.actualTime = action.payload.actualTime;
        state.statistics.inTransitRoutes -= 1;
        state.statistics.completedRoutes += 1;
      }
    },

    // Add stop to route
    addStop: (state, action) => {
      const route = state.routes.find(r => r.id === action.payload.routeId);
      if (route) {
        route.stops.push(action.payload.stop);
      }
    },

    // Remove stop from route
    removeStop: (state, action) => {
      const route = state.routes.find(r => r.id === action.payload.routeId);
      if (route) {
        route.stops = route.stops.filter((_, index) => index !== action.payload.stopIndex);
      }
    },

    // Reorder stops
    reorderStops: (state, action) => {
      const route = state.routes.find(r => r.id === action.payload.routeId);
      if (route) {
        route.stops = action.payload.stops;
      }
    },

    // Assign driver
    assignDriver: (state, action) => {
      const route = state.routes.find(r => r.id === action.payload.routeId);
      if (route) {
        route.driver = action.payload.driver;
      }
    },

    // Assign vehicle
    assignVehicle: (state, action) => {
      const route = state.routes.find(r => r.id === action.payload.routeId);
      if (route) {
        route.vehicle = action.payload.vehicle;
      }
    },

    // Set selected route
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
    },

    // Update filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Reset filters
    resetFilters: (state) => {
      state.filters = {
        status: 'all',
        priority: 'all',
        searchQuery: ''
      };
    },

    // Set loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Calculate statistics
    recalculateStatistics: (state) => {
      state.statistics = {
        totalRoutes: state.routes.length,
        activeRoutes: state.routes.filter(r => r.status === 'active').length,
        completedRoutes: state.routes.filter(r => r.status === 'completed').length,
        inTransitRoutes: state.routes.filter(r => r.status === 'in-transit').length,
        plannedRoutes: state.routes.filter(r => r.status === 'planning').length,
        totalDistance: state.routes.reduce((sum, r) => sum + parseFloat(r.distance.replace(/[^\d.]/g, '')), 0).toFixed(0) + ' km',
        totalCost: '₹' + state.routes.reduce((sum, r) => sum + parseFloat(r.cost.replace(/[^\d]/g, '')), 0).toLocaleString('en-IN'),
        averageTime: Math.round(state.routes.reduce((sum, r) => sum + parseFloat(r.estimatedTime), 0) / state.routes.length) + ' hours'
      };
    }
  }
});

export const {
  createRoute,
  updateRoute,
  deleteRoute,
  startRoute,
  completeRoute,
  addStop,
  removeStop,
  reorderStops,
  assignDriver,
  assignVehicle,
  setSelectedRoute,
  updateFilters,
  resetFilters,
  setLoading,
  setError,
  recalculateStatistics
} = routesSlice.actions;

export default routesSlice.reducer;

// ============================================================================
// MEMOIZED SELECTORS
// ============================================================================

// Stable empty array and object references
const emptyArray = [];
const defaultFilters = { status: 'all', priority: 'all', searchQuery: '' };
const defaultStatistics = {
  totalRoutes: 0,
  activeRoutes: 0,
  inTransitRoutes: 0,
  completedRoutes: 0,
  plannedRoutes: 0
};

// Base selectors
const selectRoutesState = (state) => state.routes;
const selectAllRoutesBase = (state) => state.routes?.routes || emptyArray;
const selectFiltersBase = (state) => state.routes?.filters || defaultFilters;

// Simple selectors
export const selectAllRoutes = selectAllRoutesBase;
export const selectSelectedRoute = (state) => state.routes?.selectedRoute || null;
export const selectRoutesLoading = (state) => state.routes?.loading || false;
export const selectRoutesError = (state) => state.routes?.error || null;

// MEMOIZED: selectFilteredRoutes
export const selectFilteredRoutes = createSelector(
  [selectAllRoutesBase, selectFiltersBase],
  (routes, filters) => {
    let filtered = routes;
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(route => route.status === filters.status);
    }
    
    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter(route => route.priority === filters.priority);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(route =>
        route.routeName?.toLowerCase().includes(query) ||
        route.driver?.name?.toLowerCase().includes(query) ||
        route.origin?.name?.toLowerCase().includes(query) ||
        route.destination?.name?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }
);

// MEMOIZED: selectRouteStatistics  
export const selectRouteStatistics = createSelector(
  [selectAllRoutesBase],
  (routes) => ({
    totalRoutes: routes.length,
    activeRoutes: routes.filter(r => r.status === 'active').length,
    completedRoutes: routes.filter(r => r.status === 'completed').length,
    inTransitRoutes: routes.filter(r => r.status === 'in-transit').length,
    plannedRoutes: routes.filter(r => r.status === 'planning').length
  })
);

// MEMOIZED: Routes by status
export const selectActiveRoutes = createSelector(
  [selectAllRoutesBase],
  (routes) => routes.filter(r => r.status === 'active')
);

export const selectInTransitRoutes = createSelector(
  [selectAllRoutesBase],
  (routes) => routes.filter(r => r.status === 'in-transit')
);

export const selectCompletedRoutes = createSelector(
  [selectAllRoutesBase],
  (routes) => routes.filter(r => r.status === 'completed')
);

export const selectPlannedRoutes = createSelector(
  [selectAllRoutesBase],
  (routes) => routes.filter(r => r.status === 'planning')
);

// MEMOIZED: Routes by priority
export const selectHighPriorityRoutes = createSelector(
  [selectAllRoutesBase],
  (routes) => routes.filter(r => r.priority === 'high')
);

// Parameterized selector for single route by ID
export const selectRouteById = (state, routeId) =>
  state.routes?.routes?.find(r => r.id === routeId) || null;