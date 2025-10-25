import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Vehicle {
  id: string;
  plateNumber: string;
  type: string;
  status: 'active' | 'maintenance' | 'inactive';
  location: { lat: number; lng: number };
  driverName?: string;
}

interface FleetState {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FleetState = {
  vehicles: [],
  isLoading: false,
  error: null,
};

const fleetSlice = createSlice({
  name: 'fleet',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    updateVehicleLocation: (state, action: PayloadAction<{ id: string; location: { lat: number; lng: number } }>) => {
      const vehicle = state.vehicles.find(v => v.id === action.payload.id);
      if (vehicle) {
        vehicle.location = action.payload.location;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setVehicles, updateVehicleLocation, setLoading, setError } = fleetSlice.actions;
export default fleetSlice.reducer;