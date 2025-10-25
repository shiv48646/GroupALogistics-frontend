// store/slices/customersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [
    {
      id: 'CUST-001',
      name: 'Reliance Industries Ltd',
      contactPerson: 'Mukesh Ambani',
      email: 'contact@reliance.com',
      phone: '+91 22 3555 5000',
      address: 'Maker Chambers IV, 222 Nariman Point',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400021',
      gstin: '27AAACR5055K1Z4',
      status: 'active',
      creditLimit: 5000000,
      outstandingBalance: 850000,
      totalOrders: 145,
      joinedDate: '2023-01-15',
      paymentTerms: '30 days',
      category: 'enterprise'
    },
    // ... rest of sample data
  ],
  loading: false,
  error: null
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push({
        ...action.payload,
        id: `CUST-${String(state.customers.length + 1).padStart(3, '0')}`,
        joinedDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        outstandingBalance: 0
      });
    },
    updateCustomer: (state, action) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = { ...state.customers[index], ...action.payload };
      }
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
    },
    updateCustomerBalance: (state, action) => {
      const { customerId, amount } = action.payload;
      const customer = state.customers.find(c => c.id === customerId);
      if (customer) {
        customer.outstandingBalance += amount;
      }
    }
  }
});

export const { addCustomer, updateCustomer, deleteCustomer, updateCustomerBalance } = customersSlice.actions;

// Selectors
export const selectAllCustomers = (state) => state.customers.customers;
export const selectCustomerById = (customerId) => (state) => 
  state.customers.customers.find(c => c.id === customerId);
export const selectActiveCustomers = (state) => 
  state.customers.customers.filter(c => c.status === 'active');

export default customersSlice.reducer;