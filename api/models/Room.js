import mongoose from "mongoose";

const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hotel: {
    type: mongoose.ObjectId,
    ref:"Hotel",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  roomNumbers: [{number:Number , unavailableDates: {type: [Date]} }],
},{timestamps: true});

export default mongoose.model("Room", RoomSchema);
