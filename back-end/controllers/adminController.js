import Agency from "../models/Agency.js";
import Guide from "../models/Guide.js";
import Hotel from "../models/Hotel.js";
import Traveller from "../models/Traveller.js";
import Trip from "../models/Trip.js";
import Destination from '../models/Destination.js'


export const getAllDetails = async(req,res)=>{
    try {
        const users = await Traveller.find();
        const guides = await Guide.find();
        const hotels = await Hotel.find();
        const agencies = await Agency.find();
        res.status(200).json({users:users ,guides : guides, hotels : hotels , agencies : agencies})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// controllers/adminController.js



export const deleteUserById = async (req, res) => {
  const { userId } = req.params; // Get the user ID from request parameters
    
  try {
    // Check if the user exists
    const user = await Traveller.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user exists, delete it
    await Traveller.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteGuideById = async (req, res) => {
    const { guideId } = req.params; // Get the guide ID from request parameters
      
    try {
      // Check if the guide exists
      const guide = await Guide.findById(guideId);
      if (!guide) {
        return res.status(404).json({ message: "Guide not found" });
      }
  
      // If the guide exists, delete it
      await Guide.findByIdAndDelete(guideId);
      res.status(200).json({ message: "Guide deleted successfully" });
    } catch (error) {
      console.error("Error deleting guide:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const deleteHotelById = async (req, res) => {
    const { hotelId } = req.params; // Get the hotel ID from request parameters
      
    try {
      // Check if the hotel exists
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      // If the hotel exists, delete it
      await Hotel.findByIdAndDelete(hotelId);
      res.status(200).json({ message: "Hotel deleted successfully" });
    } catch (error) {
      console.error("Error deleting hotel:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const deleteAgencyById = async (req, res) => {
    const { agencyId } = req.params; // Get the agency ID from request parameters
      
    try {
      // Check if the agency exists
      const agency = await Agency.findById(agencyId);
      if (!agency) {
        return res.status(404).json({ message: "Agency not found" });
      }
  
      // If the agency exists, delete it
      await Agency.findByIdAndDelete(agencyId);
      res.status(200).json({ message: "Agency deleted successfully" });
    } catch (error) {
      console.error("Error deleting agency:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  // export const getBookings = async(req,res) =>{
  //   try {
  //     const trips = await Trip.find()
  //     return res.json({trips : trips})
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json({message : error + 'is present here'})
  //   }
  // }

  export const getAllTripDetails = async (req, res) => {
    try {
      const trips = await Trip.find();
      const tripDetails = [];
  
      for (const trip of trips) {
        const traveller = await Traveller.findById(trip.travellerId);
        const guide = await Guide.findById(trip.guideId);
        const hotel = await Hotel.findById(trip.hotelId);
        const agency = await Agency.findById(trip.agencyId);
        const destination = await Destination.findById(trip.destinationId);
  
        const singleTrip = {
          id: trip._id,
          traveller: {
            name: traveller.name,
            email: traveller.email,
          },
          guide: {
            name: guide.name,
            email: guide.email,
          },
          hotel: {
            name: hotel.name,
            email: hotel.email,
          },
          agency: {
            name: agency.name,
            email: agency.email,
          },
          destination: destination.name,
        };
  
        tripDetails.push(singleTrip);
      }
  
      res.status(200).json({ trips: tripDetails });
    } catch (error) {
      console.error("Error fetching trip details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


