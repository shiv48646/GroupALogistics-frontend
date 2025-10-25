// store/slices/ordersSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 'ORD-001',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      customerPhone: '+1 234 567 8900',
      status: 'pending',
      total: 299.99,
      items: [
        { id: 1, name: 'Wireless Headphones', quantity: 1, price: 199.99 },
        { id: 2, name: 'Phone Case', quantity: 2, price: 50.00 }
      ],
      shippingAddress: '123 Main St, City, State 12345',
      pickupAddress: '456 Warehouse Rd, Industrial Area',
      orderDate: '2024-01-15',
      deliveryDate: null,
      notes: 'Customer requested express delivery',
      assignedVehicle: null,
      assignedDriver: null,
      priority: 'high',
      trackingNumber: 'TRK20240115001'
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      customerPhone: '+1 234 567 8901',
      status: 'processing',
      total: 149.99,
      items: [
        { id: 3, name: 'Bluetooth Speaker', quantity: 1, price: 149.99 }
      ],
      shippingAddress: '456 Oak Ave, Town, State 67890',
      pickupAddress: '456 Warehouse Rd, Industrial Area',
      orderDate: '2024-01-14',
      deliveryDate: null,
      notes: 'Gift wrapping requested',
      assignedVehicle: 'FL-001',
      assignedDriver: 'Rajesh Kumar',
      priority: 'normal',
      trackingNumber: 'TRK20240114002'
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Davis',
      customerEmail: 'mike@example.com',
      customerPhone: '+1 234 567 8902',
      status: 'shipped',
      total: 399.97,
      items: [
        { id: 4, name: 'Smart Watch', quantity: 1, price: 299.99 },
        { id: 5, name: 'Watch Band', quantity: 2, price: 49.99 }
      ],
      shippingAddress: '789 Pine St, Village, State 13579',
      pickupAddress: '456 Warehouse Rd, Industrial Area',
      orderDate: '2024-01-13',
      deliveryDate: null,
      notes: '',
      assignedVehicle: 'FL-002',
      assignedDriver: 'Amit Singh',
      priority: 'normal',
      trackingNumber: 'TRK20240113003'
    },
    {
      id: 'ORD-004',
      customerName: 'Emily Brown',
      customerEmail: 'emily@example.com',
      customerPhone: '+1 234 567 8903',
      status: 'delivered',
      total: 89.99,
      items: [
        { id: 6, name: 'USB Cable', quantity: 3, price: 29.99 }
      ],
      shippingAddress: '321 Elm St, City, State 24680',
      pickupAddress: '456 Warehouse Rd, Industrial Area',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-14',
      notes: 'Leave at door if not home',
      assignedVehicle: 'FL-004',
      assignedDriver: 'Vikram Yadav',
      priority: 'low',
      trackingNumber: 'TRK20240112004'
    }
  ],
  loading: false,
  error: null,
  selectedOrder: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...action.payload };
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find(o => o.id === id);
      if (order) {
        order.status = status;
        if (status === 'delivered' && !order.deliveryDate) {
          order.deliveryDate = new Date().toISOString().split('T')[0];
        }
      }
    },
    assignVehicleToOrder: (state, action) => {
      const { orderId, vehicleId, driverName } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.assignedVehicle = vehicleId;
        order.assignedDriver = driverName;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  setSelectedOrder,
  updateOrderStatus,
  assignVehicleToOrder,
  setLoading,
  setError
} = ordersSlice.actions;

// ============================================================================
// SELECTORS
// ============================================================================

// Stable empty array reference
const emptyArray = [];

// Base selectors
const selectOrdersBase = (state) => state.orders?.orders || emptyArray;

// Simple selectors
export const selectAllOrders = selectOrdersBase;
export const selectOrdersLoading = (state) => state.orders?.loading || false;
export const selectOrdersError = (state) => state.orders?.error || null;
export const selectSelectedOrder = (state) => state.orders?.selectedOrder || null;

// MEMOIZED: Filter by status (returns arrays of orders)
export const selectPendingOrders = createSelector(
  [selectOrdersBase],
  (orders) => orders.filter(o => o.status === 'pending')
);

export const selectProcessingOrders = createSelector(
  [selectOrdersBase],
  (orders) => orders.filter(o => o.status === 'processing')
);

export const selectShippedOrders = createSelector(
  [selectOrdersBase],
  (orders) => orders.filter(o => o.status === 'shipped')
);

export const selectDeliveredOrders = createSelector(
  [selectOrdersBase],
  (orders) => orders.filter(o => o.status === 'delivered')
);

// MEMOIZED: Order counts by status (returns object with counts) - THIS IS WHAT YOU NEED!
export const selectOrdersByStatus = createSelector(
  [selectOrdersBase],
  (orders) => {
    const counts = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };
    
    orders.forEach(order => {
      if (counts.hasOwnProperty(order.status)) {
        counts[order.status]++;
      }
    });
    
    return counts;
  }
);


// Order by ID - parameterized selector
export const selectOrderById = (state, orderId) => {
  return state.orders?.orders?.find(o => o.id === orderId) || null;
};

// Async thunk for fetching orders (if you need it)
export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Simulated API call - replace with actual API
    await new Promise(resolve => setTimeout(resolve, 500));
    // dispatch(setOrders(fetchedOrders));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

// Add this new selector for revenue calculation
export const selectTotalRevenue = createSelector(
  [selectDeliveredOrders],
  (deliveredOrders) => {
    return deliveredOrders.reduce((sum, order) => sum + order.total, 0);
  }
);
export default ordersSlice.reducer;