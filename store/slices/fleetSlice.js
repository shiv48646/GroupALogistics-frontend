import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicles: [
    {
      id: 'FL-001',
      registrationNumber: 'DL 1C AB 1234',
      type: 'Truck',
      status: 'active',
      driver: { name: 'Rajesh Kumar' },
      fuelLevel: 75
    },
    {
      id: 'FL-002',
      registrationNumber: 'HR 26 CD 5678',
      type: 'Van',
      status: 'idle',
      driver: { name: 'Amit Singh' },
      fuelLevel: 60
    }
  ]
};

const fleetSlice = createSlice({
  name: 'fleet',
  initialState,
  reducers: {
    addVehicle: (state, action) => {
      state.vehicles.push(action.payload);
    }
  }
});

export const { addVehicle } = fleetSlice.actions;

export function selectAllVehicles(state) {
  return state.fleet?.vehicles || [];
}

export function selectFilteredVehicles(state) {
  return state.fleet?.vehicles || [];
}

export default fleetSlice.reducer;