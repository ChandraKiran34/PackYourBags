import Agency from "../models/Agency.js";
import Guide from "../models/Guide.js";
import Hotel from "../models/Hotel.js";
import Trip from "../models/Trip.js";

// Controller function to create a new trip
export const createTrip = async (req, res) => {
  try {
    const { travellerId, guideId, hotelId, agencyId, destinationId } = req.body;
    console.log("testing");
    console.log(req.body.travellerId);

    // Create a new trip object
    const newTrip = new Trip({
      travellerId,
      guideId,
      hotelId,
      agencyId,
      destinationId,
      status: "booked",
    });

    // Save the new trip to the database
    const createdTrip = await newTrip.save();
    console.log(createdTrip);

    res.status(201).json(createdTrip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ error: "Failed to create trip" });
  }
};

export const autoFillTripDetailsByLocation = async (req, res) => {
  const location = req.params.location;
  try {
    const guide = await Guide.find({ location: location });
    const hotel = await Hotel.find({ location: location });
    const agency = await Agency.find({ location: location });

    res.status(200).json({ guides: guide, hotels: hotel, agencies: agency });
  } catch (err) {
    res.status(400).json({ message: "Cannot populate details" });
  }
};

export const getTripsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const userTrips = await Trip.find({ travellerId: userId.toString() });

    res.status(200).json({ userTrips });
  } catch (error) {
    const { userId } = req.params;
    console.log(userId);
    console.log(error);
    res.status(400).json({ message: "cannot get Booking details" });
  }
};

export const getAllTrips = async (req, res) => {
  console.log("hi 1 backend")
  try {
    console.log("hi 1 backend")
    const allTrips = await Trip.find()
      .populate('travellerId')
      .populate('guideId')
      .populate('hotelId')
      .populate('agencyId')
      .populate('destinationId')
      .exec();

    res.json(allTrips);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
}
