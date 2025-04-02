import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch vendors automatically on page load
export const fetchNearbyVendors = createAsyncThunk(
    'vendors/fetchNearbyVendorsAuto',
    async ({ latitude, longitude }) => {
        const response = await fetch(
            `https://helpkeyapi.onrender.com/api/nearby-vendors?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();
        console.log('API Response:', data);  // 👀 Check this in the browser console
        return data;
    }
);

const vendorsSlice = createSlice({
    name: 'vendorsAuto',
    initialState: { vendors: [], isLoading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNearbyVendors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNearbyVendors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.vendors = Array.isArray(action.payload.vendors)
                    ? action.payload.vendors
                    : [];
            })
            .addCase(fetchNearbyVendors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default vendorsSlice.reducer;
