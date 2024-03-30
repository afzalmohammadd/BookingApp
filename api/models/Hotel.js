import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  propertyType: {
    type: mongoose.ObjectId,
    ref: "Property",
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Hotel", HotelSchema)