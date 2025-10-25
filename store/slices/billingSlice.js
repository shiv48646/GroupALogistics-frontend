// store/slices/billingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [
    // Copy sample invoice data from InvoicesScreen.js
  ],
  loading: false,
  error: null
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push({
        ...action.payload,
        id: `INV-${state.invoices.length + 1}`,
        invoiceNumber: `INV-2025-${String(state.invoices.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        paid: 0,
        status: 'pending'
      });
    },
    updateInvoice: (state, action) => {
      const index = state.invoices.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index] = { ...state.invoices[index], ...action.payload };
      }
    },
    recordPayment: (state, action) => {
      const { invoiceId, amount } = action.payload;
      const invoice = state.invoices.find(i => i.id === invoiceId);
      if (invoice) {
        invoice.paid += amount;
        if (invoice.paid >= invoice.amount) {
          invoice.status = 'paid';
        } else if (invoice.paid > 0) {
          invoice.status = 'partial';
        }
      }
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(i => i.id !== action.payload);
    }
  }
});

export const { addInvoice, updateInvoice, recordPayment, deleteInvoice } = billingSlice.actions;

export const selectAllInvoices = (state) => state.billing.invoices;
export const selectInvoiceById = (invoiceId) => (state) =>
  state.billing.invoices.find(i => i.id === invoiceId);
export const selectPendingInvoices = (state) =>
  state.billing.invoices.filter(i => i.status === 'pending' || i.status === 'overdue');

export default billingSlice.reducer;