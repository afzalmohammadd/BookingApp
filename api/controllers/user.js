import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    // Handle error
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateUser = async (req, res, next) => {
  
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{ $set: req.body})
        res.status(200).json(updatedUser)
      } catch (err) {
        // Handle error
        console.log(err);
        res.status(500).json(err);
      }
  };

  export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted")
      } catch (err) {
        // Handle error
        console.log(err);
        res.status(500).json(err);
      }
  };

  export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
      } catch (err) {
        // Handle error
        console.log(err);
        res.status(500).json(err);
      }
  };

  export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
      } catch (err) {
        // Handle error
        next(err)
      }
  };
