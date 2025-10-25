// store/slices/inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
    {
      id: 'ITEM-001',
      name: 'Cardboard Boxes - Large',
      sku: 'PKG-LRG-001',
      category: 'packaging',
      currentStock: 450,
      reorderLevel: 100,
      location: 'Warehouse A',
      price: 2.50
    },
    {
      id: 'ITEM-002',
      name: 'Bubble Wrap Roll',
      sku: 'PKG-BWR-002',
      category: 'packaging',
      currentStock: 85,
      reorderLevel: 50,
      location: 'Warehouse B',
      price: 15.00
    },
    {
      id: 'ITEM-003',
      name: 'Packing Tape',
      sku: 'PKG-TPE-003',
      category: 'packaging',
      currentStock: 25,
      reorderLevel: 50,
      location: 'Warehouse A',
      price: 3.75
    },
    {
      id: 'ITEM-004',
      name: 'Hand Truck',
      sku: 'EQP-HTR-001',
      category: 'equipment',
      currentStock: 12,
      reorderLevel: 5,
      location: 'Equipment Room',
      price: 150.00
    },
    {
      id: 'ITEM-005',
      name: 'Safety Vest',
      sku: 'SAF-VST-001',
      category: 'safety',
      currentStock: 0,
      reorderLevel: 20,
      location: 'Storage Room',
      price: 12.50
    }
  ],
  movements: [],
  loading: false,
  error: null
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({
        ...action.payload,
        id: `ITEM-${String(state.items.length + 1).padStart(3, '0')}`,
        status: action.payload.quantity > action.payload.reorderLevel ? 'in-stock' : 
                action.payload.quantity > 0 ? 'low-stock' : 'out-of-stock'
      });
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    stockIn: (state, action) => {
      const { itemId, quantity, reference, note } = action.payload;
      const item = state.items.find(i => i.id === itemId);
      if (item) {
        item.quantity += quantity;
        item.status = item.quantity > item.reorderLevel ? 'in-stock' :
                      item.quantity > 0 ? 'low-stock' : 'out-of-stock';
        state.movements.push({
          id: `MOV-${state.movements.length + 1}`,
          itemId,
          type: 'in',
          quantity,
          reference,
          note,
          date: new Date().toISOString().split('T')[0]
        });
      }
    },
    stockOut: (state, action) => {
      const { itemId, quantity, reference, note } = action.payload;
      const item = state.items.find(i => i.id === itemId);
      if (item && item.quantity >= quantity) {
        item.quantity -= quantity;
        item.status = item.quantity > item.reorderLevel ? 'in-stock' :
                      item.quantity > 0 ? 'low-stock' : 'out-of-stock';
        state.movements.push({
          id: `MOV-${state.movements.length + 1}`,
          itemId,
          type: 'out',
          quantity,
          reference,
          note,
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
  }
});

export const { addItem, updateItem, stockIn, stockOut } = inventorySlice.actions;

export const selectAllItems = (state) => state.inventory.items;
export const selectItemById = (itemId) => (state) =>
  state.inventory.items.find(i => i.id === itemId);
export const selectLowStockItems = (state) =>
  state.inventory.items.filter(i => i.status === 'low-stock' || i.status === 'out-of-stock');

export default inventorySlice.reducer;
