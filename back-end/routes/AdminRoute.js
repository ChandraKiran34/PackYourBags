import express from 'express';
import { deleteUserById, getAllDetails,deleteAgencyById,deleteGuideById,deleteHotelById } from '../controllers/adminController.js';

const router = express.Router()

router.get('/getDetails',getAllDetails);

router.delete('/deleteuser/:userId',deleteUserById);
router.delete('/deleteguide/:guideId',deleteGuideById);
router.delete('/deletehotel/:hotelId',deleteHotelById);
router.delete('/deleteagency/:agencyId',deleteAgencyById);


export default router;