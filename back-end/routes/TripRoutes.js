import express from 'express';
import { autoFillTripDetailsByLocation, createTrip, getAllTrips, getTripsByUserId } from '../controllers/tripController.js';
import { verifyToken } from '../middleware/travelAuth.js';

const router = express.Router();

// Route to create a new trip
router.post('/createTrip', createTrip);
router.use(verifyToken)
router.get('/autofilldata/:location', autoFillTripDetailsByLocation);
router.get('/:userId/getUserBookingById',getTripsByUserId);

router.get('/allTrips',getAllTrips)
export default router;
