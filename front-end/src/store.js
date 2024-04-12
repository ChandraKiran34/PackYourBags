// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/UserSlice';
import guideReducer from './features/guide/GuideSlice'
import hotelReducer from './features/hotel/HotelSlice'
import agencyReducer from './features/agency/AgencySlice'
import bookingReducer from './features/booking/BookingSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    guide:guideReducer,
    hotel:hotelReducer,
    agency:agencyReducer,
    booking:bookingReducer
  },
});

export default store;
