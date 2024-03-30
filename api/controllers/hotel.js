import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import Room from "../models/Room.js";
import Property from "../models/Property.js";

export const createHotel = async (req, res, next) => {
  try {
    console.log("Inside createHotel");
    console.log(req.body, "Adding Hotel Details");
    
    const { name, city, address, phone, propertyType } = req.body;

    const foundProperty = await Property.findById(propertyType);

    if (!foundProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    const newHotel = new Hotel({
      name,
      city,
      address,
      phone,
      propertyType: foundProperty._id,
      photos: `/uploads/${req.file.filename}`
    });

    const savedHotel = await newHotel.save();

    res.status(201).json(savedHotel); // Send the saved hotel data in the response
  } catch (err) {
    // Handle error
    console.log(err);
    res.status(500).json(err);
  }
};


export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedHotel);
  } catch (err) {
    // Handle error
    console.log(err);
    res.status(500).json(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted");
  } catch (err) {
    // Handle error
    console.log(err);
    res.status(500).json(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    // Handle error
    console.log(err);
    res.status(500).json(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: parseInt(min) || 1, $lte: parseInt(max) || 999 },
    }).limit(parseInt(limit));
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    // Handle error
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  console.log("inside countByType controller");
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    // Handle error
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  console.log("inside getHotelRooms");
  try {
    
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    console.log(list,"RoomList");
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
