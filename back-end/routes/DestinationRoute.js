import express from 'express';
import { createDestination, getDestinationById, getDestinations } from '../controllers/destinationController.js';

const router = express.Router();

import multer from 'multer';
import {storage} from '../cloudinary/index.js'
const upload = multer({storage});

// Route to create a new destination
router.post('/',upload.single("picturePath"), createDestination);
router.get('/' , getDestinations);
router.get("/:id", getDestinationById);

export default router;
