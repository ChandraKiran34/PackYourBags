import express from 'express';
import { deleteUserById, getAllDetails,deleteAgencyById,deleteGuideById,deleteHotelById, getAllTripDetails } from '../controllers/adminController.js';
// import { getAllTrips } from '../controllers/tripController.js';
import Trip from '../models/Trip.js'
const router = express.Router()

router.get('/getDetails',getAllDetails);
router.get('/bookings',getAllTripDetails)

router.delete('/deleteuser/:userId',deleteUserById);
router.delete('/deleteguide/:guideId',deleteGuideById);
router.delete('/deletehotel/:hotelId',deleteHotelById);
router.delete('/deleteagency/:agencyId',deleteAgencyById);


  // Get bookings for a guide by guideId
  router.get("/guideBookings/:guideId", async (req, res) => {
    try {
      const guideId = req.params.guideId;
      console.log("hello guide bookings")
      const bookings = await Trip.find({ guideId: guideId }).populate("travellerId").populate("hotelId").populate("agencyId").populate("destinationId");
      res.status(200).json({ bookings: bookings });
    } catch (error) {
      console.error("Error fetching guide bookings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });



export default router;