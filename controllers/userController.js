// controllers/userController.js
const User = require("../models/User");

// @desc    Create a new user
// @route   POST /api/users
const createNewUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400);
      return next(new Error("name & email fields are required"));
    }

    // Check if user already exists
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      res.status(409); // 409 Conflict
      return next(new Error("User with this email already exists"));
    }

    const user = await User.create({ name, email });

    res.status(201).json({ // 201 Created
      success: true,
      user,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// @desc    Get all users
// @route   GET /api/users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "User removed successfully",
    });
  } catch (error) {
    // If the ID format is invalid (e.g., not 24 characters), Mongoose throws an error
    if (error.kind === 'ObjectId') {
        res.status(400);
        return next(new Error("Invalid User ID format"));
    }
    return next(error);
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  deleteUser,
};