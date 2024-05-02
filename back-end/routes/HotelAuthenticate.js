import express from 'express';
import { registerHotel, loginHotel,getHotelDetails,getBookingDetailsByHotelId,updateHotelDetailsById } from '../controllers/hotelController.js';
import { verifyToken } from '../middleware/travelAuth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hotel
 *   description: API endpoints for managing hotel details and bookings
 */

/**
 * @swagger
 * /hotel/register:
 *   post:
 *     summary: Register a new hotel
 *     tags: [Hotel]
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
 *               numberOfRoomsAvailable:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Hotel registered successfully
 */

/**
 * @swagger
 * /hotel/login:
 *   post:
 *     summary: Login a hotel
 *     tags: [Hotel]
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
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */

// Define your hotel routes here



// Route to register a new hotel
router.post('/register', registerHotel);

// Route to login a hotel
router.post('/login', loginHotel);

// Get booking details by hotel ID
router.get('/:hotelId/bookings', getBookingDetailsByHotelId);

router.use(verifyToken);


// Get hotel details by ID (dashboard)
router.get('/:hotelId/dashboard', getHotelDetails);

// Update hotel details by ID
router.put('/:hotelId/update', updateHotelDetailsById);



export  default router ;