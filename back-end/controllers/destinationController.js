import Destination from '../models/Destination.js';
// import redis from 'redis'
import redis from '../redis.js';
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


// export const getDestinations = async (req, res) => {
//   console.log("hello ")
//   try {
//     console.log(client)
//     console.log("hello 1 ")
//     const cachekey = "destinations";
//     console.log("hello 2");
//     let destinations = await client.get("destinations");
//     console.log("hello 3")
//     if (destinations) {
//       console.log("available in cache ");
//       return res.status(200).json(JSON.parse(destinations));
//     } else {
//       destinations = await Destination.find();
//       console.log(destination);
//       client.set(cachekey, JSON.stringify(destinations));
//       return res.status(200).json(destinations);
//     }
//     // console.log(destinations);
//   } catch (error) {
//     return res.status(400).json({ Message: "Error getting destinations" });
//   }
// };


export const getDestinations = async (req, res) => {
  try {
    // let destinations = await redis.get("destinations");

    // if (destinations) {
    //   console.log("Cache hit");
    //   return res.status(200).json(destinations);
    // }
    // console.log("Cache miss");
    // If destinations are not cached, retrieve them from the database
    let destinations = await Destination.find({});
    
    // Set the destinations in the cache
      // await redis.set("destinations", JSON.stringify(destinations)); // Redis stores strings
    // Return the destinations to the client
    return res.status(200).json(destinations);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


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

