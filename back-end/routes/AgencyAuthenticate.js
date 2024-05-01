import express from 'express';
import { registerAgency, loginAgency, getAgencyDetails, updateAgencyDetailsById, getBookingDetailsByAgencyId } from '../controllers/agencyController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Agency
 *   description: API endpoints for managing agency details and bookings
 */

/**
 * @swagger
 * /agency/{agencyId}/dashboard:
 *   get:
 *     summary: Get agency dashboard details
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: agencyId
 *         required: true
 *         description: ID of the agency
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agency'
 */

/**
 * @swagger
 * /agency/{agencyId}/bookings:
 *   get:
 *     summary: Get bookings for an agency
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: agencyId
 *         required: true
 *         description: ID of the agency
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */

// Define your agency routes here


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