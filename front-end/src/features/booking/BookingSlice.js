// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const BookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: {}
  },
  reducers: {
    setBooking: (state, action) => {
      return { ...state, data: action.payload };
    },
    clearBooking: (state) => {
      return {};
    },
  },
});

export const { setBooking, clearBooking } = BookingSlice.actions;

export default BookingSlice.reducer;
