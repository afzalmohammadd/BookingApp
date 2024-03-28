import mongoose from "mongoose";
const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

export default mongoose.model("Property", PropertySchema)