import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    console.log("pppp");
    console.log(req.body);
    console.log(req.file,"pppasdf");


    const { username, email, password , country ,city,phone } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt)

    const newUser = new User({
      username,
      email,
      country,
      city,
      phone,
      password: hash,
      img: `/uploads/${req.file.filename}`
    })

    await newUser.save();

    console.log(newUser,"NU");

  
    res.status(200).send("User has been created");
  } catch (err) {
    console.error(err)
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      console.log("USER NOT FOUND");
      return next(createError(400, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!isPasswordCorrect) {
      console.log("Wrong password or username");
      return next(createError(400, "Wrong password or username!"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details:{...otherDetails}, isAdmin });
  } catch (err) {
    next(err);
  }
};

