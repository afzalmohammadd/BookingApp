import Property from "../models/Property.js";



export const createPropertyType = async (req, res, next) => {

  try {
    const name = req.body.name

    const savedProperty = new Property({
        name,
        image:`/uploads/${req.file.filename}`
    })

    await savedProperty.save()

    res.status(201).send("Property has been created");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getTypes = async (req, res, next) => {
  console.log("inside getTypes");
  try {
      const PropertyTypes = await Property.find()
      res.status(200).json(PropertyTypes)
    } catch (err) {
      console.log(err);
      next(err)
    }
};
