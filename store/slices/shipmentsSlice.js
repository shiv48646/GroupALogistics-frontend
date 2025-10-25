import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shipments: [
    {
      id: 'SHIP-001',
      trackingNumber: 'TRK1234567890',
      customerName: 'John Smith',
      origin: 'New York, NY',
      destination: 'Los Angeles, CA',
      status: 'in-transit',
      estimatedDelivery: '2024-10-05',
      currentLocation: 'Chicago, IL',
      weight: 25.5,
      dimensions: '30x20x15 cm',
      carrier: 'Express Logistics',
      trackingHistory: [
        { location: 'New York, NY', status: 'Picked up', timestamp: '2024-10-01 09:00 AM' },
        { location: 'Philadelphia, PA', status: 'In transit', timestamp: '2024-10-01 02:30 PM' },
        { location: 'Chicago, IL', status: 'Sorting facility', timestamp: '2024-10-02 08:15 AM' }
      ]
    },
    {
      id: 'SHIP-002',
      trackingNumber: 'TRK0987654321',
      customerName: 'Sarah Johnson',
      origin: 'Miami, FL',
      destination: 'Seattle, WA',
      status: 'delivered',
      estimatedDelivery: '2024-09-30',
      actualDelivery: '2024-09-30',
      currentLocation: 'Seattle, WA',
      weight: 15.2,
      dimensions: '25x15x10 cm',
      carrier: 'Fast Ship Co',
      trackingHistory: [
        { location: 'Miami, FL', status: 'Picked up', timestamp: '2024-09-28 10:00 AM' },
        { location: 'Atlanta, GA', status: 'In transit', timestamp: '2024-09-28 06:45 PM' },
        { location: 'Denver, CO', status: 'Sorting facility', timestamp: '2024-09-29 11:20 AM' },
        { location: 'Seattle, WA', status: 'Delivered', timestamp: '2024-09-30 02:15 PM' }
      ]
    },
    {
      id: 'SHIP-003',
      trackingNumber: 'TRK5555666677',
      customerName: 'Mike Davis',
      origin: 'Boston, MA',
      destination: 'Austin, TX',
      status: 'pending',
      estimatedDelivery: '2024-10-06',
      currentLocation: 'Boston, MA',
      weight: 42.8,
      dimensions: '50x40x30 cm',
      carrier: 'Quick Delivery',
      trackingHistory: [
        { location: 'Boston, MA', status: 'Order received', timestamp: '2024-10-01 03:00 PM' }
      ]
    },
    {
      id: 'SHIP-004',
      trackingNumber: 'TRK9998887776',
      customerName: 'Emily Wilson',
      origin: 'San Francisco, CA',
      destination: 'Phoenix, AZ',
      status: 'delayed',
      estimatedDelivery: '2024-10-03',
      currentLocation: 'Las Vegas, NV',
      weight: 18.5,
      dimensions: '35x25x20 cm',
      carrier: 'Express Logistics',
      delayReason: 'Weather conditions',
      trackingHistory: [
        { location: 'San Francisco, CA', status: 'Picked up', timestamp: '2024-09-30 08:00 AM' },
        { location: 'San Jose, CA', status: 'In transit', timestamp: '2024-09-30 11:30 AM' },
        { location: 'Las Vegas, NV', status: 'Delayed - Weather', timestamp: '2024-10-01 09:00 AM' }
      ]
    },
    {
      id: 'SHIP-005',
      trackingNumber: 'TRK3334445556',
      customerName: 'David Brown',
      origin: 'Portland, OR',
      destination: 'Denver, CO',
      status: 'in-transit',
      estimatedDelivery: '2024-10-04',
      currentLocation: 'Salt Lake City, UT',
      weight: 31.7,
      dimensions: '40x30x25 cm',
      carrier: 'Fast Ship Co',
      trackingHistory: [
        { location: 'Portland, OR', status: 'Picked up', timestamp: '2024-10-01 07:00 AM' },
        { location: 'Boise, ID', status: 'In transit', timestamp: '2024-10-01 04:15 PM' },
        { location: 'Salt Lake City, UT', status: 'Sorting facility', timestamp: '2024-10-02 10:30 AM' }
      ]
    }
  ],
  loading: false,
  error: null,
  selectedShipment: null,
  filterStatus: 'all',
  searchQuery: ''
};

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setShipments: (state, action) => {
      state.shipments = action.payload;
    },
    addShipment: (state, action) => {
      state.shipments.unshift(action.payload);
    },
    updateShipment: (state, action) => {
      const index = state.shipments.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.shipments[index] = { ...state.shipments[index], ...action.payload };
      }
    },
    deleteShipment: (state, action) => {
      state.shipments = state.shipments.filter(s => s.id !== action.payload);
    },
    setSelectedShipment: (state, action) => {
      state.selectedShipment = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    updateShipmentStatus: (state, action) => {
      const { id, status, location } = action.payload;
      const shipment = state.shipments.find(s => s.id === id);
      if (shipment) {
        shipment.status = status;
        if (location) shipment.currentLocation = location;
        shipment.trackingHistory.push({
          location: location || shipment.currentLocation,
          status: status,
          timestamp: new Date().toLocaleString()
        });
      }
    },
    addTrackingUpdate: (state, action) => {
      const { id, update } = action.payload;
      const shipment = state.shipments.find(s => s.id === id);
      if (shipment) {
        shipment.trackingHistory.push(update);
        shipment.currentLocation = update.location;
      }
    }
  }
});

export const {
  setShipments,
  addShipment,
  updateShipment,
  deleteShipment,
  setSelectedShipment,
  setFilterStatus,
  setSearchQuery,
  updateShipmentStatus,
  addTrackingUpdate
} = shipmentsSlice.actions;

export const selectAllShipments = (state) => state.shipments.shipments;
export const selectShipmentById = (state, shipmentId) => 
  state.shipments.shipments.find(s => s.id === shipmentId);
export const selectFilteredShipments = (state) => {
  const { shipments, filterStatus, searchQuery } = state.shipments;
  let filtered = shipments;
  
  if (filterStatus !== 'all') {
    filtered = filtered.filter(s => s.status === filterStatus);
  }
  
  if (searchQuery) {
    filtered = filtered.filter(s =>
      s.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filtered;
};

export default shipmentsSlice.reducer;
