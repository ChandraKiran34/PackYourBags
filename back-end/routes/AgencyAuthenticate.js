import express from 'express';
import { registerAgency, loginAgency, getAgencyDetails, updateAgencyDetailsById, getBookingDetailsByAgencyId } from '../controllers/agencyController.js';

const router = express.Router();

// Route to register a new agency
router.post('/register', registerAgency);

// Route to login an agency
router.post('/login', loginAgency);

// Get agency details by ID (dashboard)
router.get('/:agencyId/dashboard', getAgencyDetails);

// Update agency details by ID
router.put('/:agencyId/update', updateAgencyDetailsById);

// Get booking details by agency ID
router.get('/:agencyId/bookings', getBookingDetailsByAgencyId);



export default router;
