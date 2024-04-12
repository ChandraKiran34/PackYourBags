import Destination from '../models/Destination.js';

// Controller function to create a new destination
export const createDestination = async (req, res) => {
  try {
    const picpath = req.file.path;
    const { name, description, location, placesToVisit } = req.body;

    // Create a new destination object
    const newDestination = new Destination({
      name,
      description,
      location,
      picturePath:picpath,
      placesToVisit
    });

    // Save the new destination to the database
    const createdDestination = await newDestination.save();

    res.status(201).json(createdDestination);
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ error: 'Failed to create destination' });
  }
};


export const getDestinations = async (req , res) => {

  try {
    const destinations = await Destination.find().limit(4);

    console.log(destinations);

    return res.status(200).json(destinations)
  } catch (error)
 {
  return res.status(400).json({Message : "Error getting destinations"})
 }
}

export const getDestinationById = async (req , res) => {

  const destinationId = req.params.id;

  try {
    const destination = await Destination.findById(destinationId);

    console.log(destination);

    return res.status(200).json(destination)
  } catch (error)
 {
  return res.status(400).json({Message : "Error getting destinations"})
 }
}

