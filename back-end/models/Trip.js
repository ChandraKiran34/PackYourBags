import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
  travellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Traveller',
    required: true
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide',
    required: true
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: true
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'travelled'],
    default: 'booked'
  },
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
