// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const HotelSlice = createSlice({
  name: "hotel",
  initialState: {
    hotelData:null,
    token:null
  },
  reducers: {
    setHotel: (state, action) => {
      state.hotelData = action.payload.hotel
      state.token = action.payload.token;
    },
    updateHotelDetails(state, action) {
      // Update user details in the state
      console.log(action);
      state.hotelData = action.payload;
    },
    clearHotel: (state) => {
      state.hotelData = null;
      state.token = null;
    },
  },
});

export const { setHotel, clearHotel,updateHotelDetails } = HotelSlice.actions;

export default HotelSlice.reducer;
