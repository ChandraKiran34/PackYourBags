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
 * /agencies/register:
 *   post:
 *     summary: Register a new agency
 *     tags: [Agency]
 *     description: Register a new agency with name, email, password, phone number, number of vehicles available, and location
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
 *               numberOfVehiclesAvailable:
 *                 type: integer
 *               location:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Agency registered successfully
 *       '400':
 *         description: Email is already registered
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /agencies/login:
 *   post:
 *     summary: Login an agency
 *     tags: [Agency]
 *     description: Login an agency with email and password
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
 *                 token:
 *                   type: string
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal server error
 */

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