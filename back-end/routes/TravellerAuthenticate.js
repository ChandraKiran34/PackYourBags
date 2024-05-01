import express from 'express';
import { registerTraveller, loginTraveller, updateTravellerDetailsById, getBookingDetailsByTravellerId, getTravellerDetails } from '../controllers/travellerController.js';
import { verifyToken } from '../middleware/travelAuth.js';
import { getBookingDetailsByHotelId, getHotelDetails, updateHotelDetailsById } from '../controllers/hotelController.js';
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new traveller
 *     description: Register a new traveller with name, email, password, phone number, and address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Traveller registered successfully
 *       '400':
 *         description: Email is already registered
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a traveller
 *     description: Login a traveller with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *                 token:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal server error
 */


// Register a new traveller
router.post('/register', registerTraveller);

// Login a traveller
router.post('/login', loginTraveller);


// Protected routes - require authentication
router.use(verifyToken);


// Get traveller details by ID (dashboard)
router.get('/:travellerId/dashboard', getTravellerDetails);

// Update traveller details by ID
router.put('/:travellerId/update', updateTravellerDetailsById);

// Get booking details by traveller ID
router.get('/:travellerId/bookings', getBookingDetailsByTravellerId);

export default router;