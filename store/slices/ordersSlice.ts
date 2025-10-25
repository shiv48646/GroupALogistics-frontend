// store/slices/ordersSlice.ts - Clean Version
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Enhanced Order interface
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  orderDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderFilters {
  search: string;
  status: 'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

export interface OrdersPagination {
  page: number;
  limit: number;
  total: number;
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  selectedOrder: Order | null;
  filters: OrderFilters;
  pagination: OrdersPagination;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,
  selectedOrder: null,
  filters: {
    search: '',
    status: 'all',
    dateRange: undefined
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
};

// Async thunks for API calls
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      // Sample data for now
      const sampleOrders: Order[] = [
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
          orderDate: '2024-01-15',
          notes: 'Customer requested express delivery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
          orderDate: '2024-01-14',
          notes: 'Gift wrapping requested',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
          orderDate: '2024-01-13',
          notes: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      return sampleOrders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const newOrder: Order = {
        ...orderData,
        id: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return newOrder;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, ...updateData }: Partial<Order> & { id: string }, { rejectWithValue }) => {
    try {
      const updatedOrder: Order = {
        ...updateData as Order,
        id,
        updatedAt: new Date().toISOString()
      };
      return updatedOrder;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOrderAsync = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      return orderId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.pagination.total = action.payload.length;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.pagination.total += 1;
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = { ...action.payload, updatedAt: new Date().toISOString() };
      }
      if (state.selectedOrder && state.selectedOrder.id === action.payload.id) {
        state.selectedOrder = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    setFilter: (state, action: PayloadAction<{ key: keyof OrderFilters; value: any }>) => {
      const { key, value } = action.payload;
      (state.filters as any)[key] = value;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        status: 'all',
        dateRange: undefined
      };
    },
    setPagination: (state, action: PayloadAction<Partial<OrdersPagination>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
      state.pagination.total -= 1;
      if (state.selectedOrder && state.selectedOrder.id === action.payload) {
        state.selectedOrder = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.pagination.total = action.payload.length;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.selectedOrder && state.selectedOrder.id === action.payload.id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(order => order.id !== action.payload);
        state.pagination.total -= 1;
        if (state.selectedOrder && state.selectedOrder.id === action.payload) {
          state.selectedOrder = null;
        }
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

// Export actions
export const {
  setOrders,
  addOrder,
  updateOrder,
  setLoading,
  setError,
  setSelectedOrder,
  clearSelectedOrder,
  setFilter,
  clearFilters,
  setPagination,
  clearError,
  updateOrderStatus,
  deleteOrder
} = ordersSlice.actions;

// Selectors - Fixed to use proper state structure
export const selectAllOrders = (state: any) => state.orders?.orders || [];
export const selectOrdersLoading = (state: any) => state.orders?.isLoading || false;
export const selectOrdersError = (state: any) => state.orders?.error || null;
export const selectSelectedOrder = (state: any) => state.orders?.selectedOrder || null;
export const selectOrdersFilters = (state: any) => state.orders?.filters || { search: '', status: 'all' };
export const selectOrdersPagination = (state: any) => state.orders?.pagination || { page: 1, limit: 10, total: 0 };

export const selectFilteredOrders = (state: any) => {
  const orders = state.orders?.orders || [];
  const filters = state.orders?.filters || { search: '', status: 'all' };
  let filtered = [...orders];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter((order: Order) =>
      order.id.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter((order: Order) => order.status === filters.status);
  }

  return filtered;
};

export const selectOrdersByStatus = (state: any) => {
  const orders = state.orders?.orders || [];
  return {
    all: orders.length,
    pending: orders.filter((order: Order) => order.status === 'pending').length,
    processing: orders.filter((order: Order) => order.status === 'processing').length,
    shipped: orders.filter((order: Order) => order.status === 'shipped').length,
    delivered: orders.filter((order: Order) => order.status === 'delivered').length,
    cancelled: orders.filter((order: Order) => order.status === 'cancelled').length
  };
};

export default ordersSlice.reducer;